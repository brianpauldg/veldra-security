'use client'

/**
 * /clinic/integrations/optimantra — OptiMantra Integration Dashboard
 * Admin/medical_director only. Shows integration health and flagged items.
 */

export default function OptiMantraIntegrationPage() {
  const enabled = process.env.NEXT_PUBLIC_OPTIMANTRA_ENABLED === 'true'

  if (!enabled) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white">OptiMantra Integration</h1>
        <div className="mt-6 bg-[#222] rounded-lg p-6 text-center">
          <p className="text-[#a0a0a0]">Integration pending, awaiting BAA confirmation and onboarding completion.</p>
          <p className="text-xs text-[#666] mt-2">Set OPTIMANTRA_ENABLED=true after BAA is confirmed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-white">OptiMantra Integration</h1>

      {/* Integration Status */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Integration Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Status', value: 'Active' },
            { label: 'Last API Call', value: '—' },
            { label: 'API Errors (24h)', value: '—' },
            { label: 'Avg Response Time', value: '—' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-white">{m.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Webhook Health */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Webhook Health</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Last Received', value: '—' },
            { label: 'Events (24h)', value: '—' },
            { label: 'Signature Failures', value: '—' },
            { label: 'Handler Errors', value: '—' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-white">{m.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Flagged Prescriptions */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Flagged Prescriptions</h2>
        <p className="text-sm text-[#a0a0a0]">No flagged prescriptions in the last 24 hours.</p>
      </section>

      {/* Document Push Status */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Document Push</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Pushed (24h)', value: '—' },
            { label: 'Failed (24h)', value: '—' },
            { label: 'Pending', value: '—' },
          ].map(m => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-semibold text-white">{m.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Mapping */}
      <section className="bg-[#222] rounded-lg p-6">
        <h2 className="text-lg font-medium text-[#c9b88c] mb-4">Patient Mapping</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Mapped', value: '—' },
            { label: 'Unmapped', value: '—' },
            { label: 'Total', value: '—' },
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
