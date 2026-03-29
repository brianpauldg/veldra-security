"use client"
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Prefill email from query param if present
  useEffect(() => {
    const qEmail = searchParams?.get('email')
    if (qEmail) setEmail(qEmail)

    // If returning from Stripe checkout, verify session and redirect
    const checkout = searchParams?.get('checkout')
    const sessionId = searchParams?.get('session_id')
    if (checkout === 'complete' && sessionId) {
      ;(async () => {
        setLoading(true)
        try {
          const res = await fetch(`/api/checkout-session-verify?session_id=${encodeURIComponent(sessionId)}`)
          const data = await res.json()
          if (res.ok) {
            // Profile created/verified — go to dashboard
            router.replace('/dashboard')
          } else {
            setError(data?.error || 'Verification failed')
          }
        } catch (err: any) {
          setError(err.message || 'Verification error')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Server error')

      if (data.existing) {
        // Existing account — go to dashboard
        router.push(data.redirect || '/dashboard')
        return
      }

      if (data.url) {
        // New user — redirect to Stripe Checkout
        // Use location.assign so Stripe's query params are preserved on return
        window.location.assign(data.url)
        return
      }

      throw new Error('Unexpected response')
    } catch (err: any) {
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '3rem auto', padding: '1rem' }}>
      <h1>Start your free trial</h1>
      <p>Enter your work email to get started — existing accounts will be redirected to the dashboard.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: 8, marginBottom: 12 }}
          />
        </label>

        <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
          {loading ? 'Processing…' : 'Start Free Trial'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
