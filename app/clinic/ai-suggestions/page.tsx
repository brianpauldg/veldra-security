'use client'

import { useState, useEffect } from 'react'
import { Bot, Check, X, Clock } from 'lucide-react'

export default function AISuggestionsPage() {
  const [confirmations, setConfirmations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    loadConfirmations()
    const interval = setInterval(loadConfirmations, 30000) // Auto-refresh every 30s
    return () => clearInterval(interval)
  }, [])

  async function loadConfirmations() {
    try {
      // In production, fetch from /api/clinic/ai-confirmations
      // For now, show empty state
      setConfirmations([])
    } catch {}
    setLoading(false)
  }

  async function handleConfirm(token: string) {
    setActionLoading(token)
    try {
      await fetch(`/api/clinic/ai-confirmations/${token}/confirm`, { method: 'POST' })
      loadConfirmations()
    } catch {}
    setActionLoading('')
  }

  async function handleReject(token: string) {
    const reason = prompt('Reason for rejection:')
    if (!reason) return
    setActionLoading(token)
    try {
      await fetch(`/api/clinic/ai-confirmations/${token}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      loadConfirmations()
    } catch {}
    setActionLoading('')
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">AI Suggestions</h1>
        <p className="text-sm text-graphite-500 mt-1">AB 3030 — AI-generated actions awaiting clinician confirmation</p>
      </div>

      <div className="rounded-xl border border-graphite-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-graphite-500 text-sm">Loading...</div>
        ) : confirmations.length === 0 ? (
          <div className="p-8 text-center">
            <Bot className="w-8 h-8 text-graphite-600 mx-auto mb-2" />
            <p className="text-sm text-graphite-500">No pending AI suggestions.</p>
            <p className="text-xs text-graphite-600 mt-1">AI-suggested actions will appear here for your review before execution.</p>
          </div>
        ) : (
          <div className="divide-y divide-graphite-800/50">
            {confirmations.map((c: any) => (
              <div key={c.token} className="p-4 hover:bg-graphite-900/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-graphite-800 text-graphite-400">{c.ai_source}</span>
                      <span className="text-xs text-white font-medium">{c.write_action}</span>
                    </div>
                    <p className="text-xs text-graphite-400">{JSON.stringify(c.write_payload).slice(0, 100)}...</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-graphite-500">
                      <Clock className="w-3 h-3" />
                      Expires: {new Date(c.expires_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(c.token)}
                      disabled={actionLoading === c.token}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReject(c.token)}
                      disabled={actionLoading === c.token}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
