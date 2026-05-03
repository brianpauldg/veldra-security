/**
 * Bloom Metabolics — Payment Provider Factory
 * Returns the active payment provider based on configuration.
 * Default: Stripe. Future: Corepay/PaymentCloud/Easy Pay Direct.
 */

import type { PaymentProvider } from './types'
import { StripeProvider } from './stripe'

const ACTIVE_PROVIDER = process.env.PAYMENT_PROVIDER || 'stripe'

export function getPaymentProvider(): PaymentProvider {
  switch (ACTIVE_PROVIDER) {
    case 'stripe':
      return new StripeProvider()
    case 'corepay':
      // TODO: Group 5 — implement Corepay provider
      throw new Error('Corepay provider not yet implemented. See compliance/PLAN.md Group 5.')
    default:
      return new StripeProvider()
  }
}
