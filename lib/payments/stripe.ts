/**
 * Bloom Metabolics — Stripe Payment Provider
 * Implements PaymentProvider interface wrapping existing Stripe SDK usage.
 */

import Stripe from 'stripe'
import type { PaymentProvider, CheckoutSessionParams, CheckoutSessionResult, InvoiceParams, InvoiceResult, CustomerResult } from './types'

export class StripeProvider implements PaymentProvider {
  name = 'stripe'
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    })
  }

  async findOrCreateCustomer(email: string, name?: string, metadata?: Record<string, string>): Promise<CustomerResult> {
    const existing = await this.stripe.customers.list({ email, limit: 1 })
    if (existing.data.length > 0) {
      return { customerId: existing.data[0].id, email }
    }
    const customer = await this.stripe.customers.create({
      email,
      name: name || undefined,
      metadata: metadata || undefined,
    })
    return { customerId: customer.id, email }
  }

  async createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSessionResult> {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: params.mode,
      customer_email: params.customerEmail,
      payment_method_types: ['card'],
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    }

    if (params.couponAmountOff) {
      const coupon = await this.stripe.coupons.create({
        amount_off: params.couponAmountOff,
        currency: 'usd',
        duration: 'once',
        name: 'Consultation fee credit',
      })
      sessionParams.discounts = [{ coupon: coupon.id }]
    }

    const session = await this.stripe.checkout.sessions.create(sessionParams)
    return { sessionId: session.id, url: session.url }
  }

  async retrieveSession(sessionId: string): Promise<Record<string, unknown>> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, { expand: ['customer'] })
    return session as unknown as Record<string, unknown>
  }

  async createInvoice(params: InvoiceParams): Promise<InvoiceResult> {
    const invoice = await this.stripe.invoices.create({
      customer: params.customerId,
      collection_method: 'send_invoice',
      days_until_due: params.sendToCustomer ? 1 : 30,
      metadata: params.metadata,
    })

    for (const item of params.lineItems) {
      await this.stripe.invoiceItems.create({
        customer: params.customerId,
        invoice: invoice.id,
        amount: item.amountCents,
        currency: 'usd',
        description: item.description,
      })
    }

    await this.stripe.invoices.finalizeInvoice(invoice.id)

    if (params.sendToCustomer) {
      await this.stripe.invoices.sendInvoice(invoice.id)
    }

    if (params.markAsPaid) {
      await this.stripe.invoices.pay(invoice.id, { paid_out_of_band: true })
    }

    return {
      invoiceId: invoice.id,
      invoiceUrl: invoice.hosted_invoice_url || null,
      status: params.markAsPaid ? 'paid' : 'sent',
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<{ cancelAt: string }> {
    const cancelled = await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return { cancelAt: new Date(cancelled.current_period_end * 1000).toISOString() }
  }

  constructWebhookEvent(payload: Buffer, signature: string, secret: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, signature, secret)
  }
}
