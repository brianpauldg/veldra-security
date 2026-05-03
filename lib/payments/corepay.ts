/**
 * Bloom Metabolics — Corepay Payment Provider (Stub)
 * High-risk payment processor for telehealth/pharmacy verticals.
 *
 * TODO: Implement in Group 5 post-launch.
 * See compliance/PLAN.md for migration plan.
 */

import type { PaymentProvider, CheckoutSessionParams, CheckoutSessionResult, InvoiceParams, InvoiceResult, CustomerResult } from './types'

export class CorepayProvider implements PaymentProvider {
  name = 'corepay'

  private notImplemented(method: string): never {
    throw new Error(`CorepayProvider.${method}() not implemented. This is a post-launch Group 5 build. See compliance/PLAN.md.`)
  }

  async findOrCreateCustomer(): Promise<CustomerResult> { this.notImplemented('findOrCreateCustomer') }
  async createCheckoutSession(): Promise<CheckoutSessionResult> { this.notImplemented('createCheckoutSession') }
  async retrieveSession(): Promise<Record<string, unknown>> { this.notImplemented('retrieveSession') }
  async createInvoice(): Promise<InvoiceResult> { this.notImplemented('createInvoice') }
  async cancelSubscription(): Promise<{ cancelAt: string }> { this.notImplemented('cancelSubscription') }
  constructWebhookEvent(): unknown { this.notImplemented('constructWebhookEvent') }
}
