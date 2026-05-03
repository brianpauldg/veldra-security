'use client'

/**
 * /clinic/analytics — Internal analytics dashboard
 * Shows conversion funnel, channel attribution, and referral metrics.
 */

export default function AnalyticsDashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-white">Analytics</h1>

      {/* Funnel Overview */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Conversion Funnel</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Visitors', value: '—' },
            { label: 'Leads', value: '—' },
            { label: 'Consultations', value: '—' },
            { label: 'Conversions', value: '—' },
            { label: 'Active Patients', value: '—' },
          ].map(step => (
            <div key={step.label} className="text-center">
              <div className="text-2xl font-semibold text-white">{step.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{step.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#666] mt-4">Data populates after PostHog + Supabase migration are live.</p>
      </section>

      {/* Channel Attribution */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Channel Attribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { channel: 'Organic Search', leads: '—', conv: '—' },
            { channel: 'Paid (Google)', leads: '—', conv: '—' },
            { channel: 'Paid (Meta)', leads: '—', conv: '—' },
            { channel: 'Referral', leads: '—', conv: '—' },
            { channel: 'Direct', leads: '—', conv: '—' },
            { channel: 'Email', leads: '—', conv: '—' },
          ].map(ch => (
            <div key={ch.channel} className="flex justify-between items-center border-b border-[#333] pb-2">
              <span className="text-sm text-white">{ch.channel}</span>
              <span className="text-xs text-[#a0a0a0]">{ch.leads} leads / {ch.conv} conv</span>
            </div>
          ))}
        </div>
      </section>

      {/* Referral Program */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Referral Program</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Codes', value: '—' },
            { label: 'Referrals Made', value: '—' },
            { label: 'Conversions', value: '—' },
            { label: 'Credits Issued', value: '—' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-white">{m.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Email Sequences */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Email Sequences</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Enrollments', value: '—' },
            { label: 'Emails Sent (30d)', value: '—' },
            { label: 'Open Rate', value: '—' },
            { label: 'Unsubscribes', value: '—' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-white">{m.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
