'use client'

import { cn } from '@/lib/utils'
import {
  Settings, Shield, Bell, Bot, Users, Database,
  Key, Activity, ExternalLink,
} from 'lucide-react'
import { ROLE_LABELS } from '@/lib/clinic/roles'

const TEAM = [
  { id: 'usr_admin_001', firstName: 'Brian', lastName: 'DeGuzman', email: 'brian@bloommetabolics.com', role: 'super_admin' as const, title: 'Founder & RN', isActive: true },
  { id: 'usr_doc_001', firstName: 'Albert', lastName: 'Aparisio', email: '', role: 'physician' as const, title: 'Medical Director', isActive: true },
  { id: 'usr_coord_001', firstName: 'Mahshad', lastName: 'Nejad', email: '', role: 'admin_ops' as const, title: 'Patient Coordinator / Operations', isActive: true },
]
import { mcpTools } from '@/lib/clinic/mcp-adapter'

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-sm text-graphite-500 mt-1">Platform configuration and integrations</p>
      </div>

      {/* Team */}
      <SettingsCard title="Team & Roles" icon={Users}>
        <div className="space-y-2">
          {TEAM.map(user => (
            <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-graphite-800/30">
              <div className="w-8 h-8 rounded-full bg-graphite-800 border border-graphite-700 flex items-center justify-center text-xs font-bold text-white">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-graphite-500">{user.title}{user.email ? ` · ${user.email}` : ''}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-graphite-800 text-graphite-400 capitalize">
                {ROLE_LABELS[user.role]}
              </span>
              <div className={cn('w-2 h-2 rounded-full', user.isActive ? 'bg-emerald-400' : 'bg-graphite-600')} />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* MCP Integration */}
      <SettingsCard title="MCP Agent Integration" icon={Bot}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-nova-500/5 border border-nova-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-nova-300 font-medium">MCP Server Connected</span>
          </div>

          <p className="text-xs text-graphite-400">Available agent tools:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.values(mcpTools).map(tool => (
              <div key={tool.name} className="p-2.5 rounded-lg bg-graphite-800/30 border border-graphite-800/50">
                <p className="text-[11px] font-mono text-nova-400">{tool.name}</p>
                <p className="text-[10px] text-graphite-500 mt-0.5 line-clamp-2">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard title="Notification Preferences" icon={Bell}>
        <div className="space-y-2">
          {[
            { label: 'Critical alerts', desc: 'Immediate notification for critical safety alerts', enabled: true },
            { label: 'High-priority alerts', desc: 'Notification for high-severity alerts', enabled: true },
            { label: 'Task assignments', desc: 'When a new task is assigned to you', enabled: true },
            { label: 'Refill requests', desc: 'When a patient submits a refill request', enabled: true },
            { label: 'Lab results', desc: 'When new lab results are available', enabled: true },
            { label: 'Agent actions', desc: 'When an AI agent completes an action', enabled: false },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
              <div>
                <p className="text-xs font-medium text-white">{item.label}</p>
                <p className="text-[10px] text-graphite-500">{item.desc}</p>
              </div>
              <div className={cn(
                'w-8 h-5 rounded-full relative cursor-pointer transition-colors',
                item.enabled ? 'bg-nova-500' : 'bg-graphite-700'
              )}>
                <div className={cn(
                  'w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform',
                  item.enabled ? 'translate-x-3.5' : 'translate-x-0.5'
                )} />
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Security */}
      <SettingsCard title="Security & Compliance" icon={Shield}>
        <div className="space-y-2 text-xs text-graphite-400">
          <div className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
            <span>Session timeout</span>
            <span className="text-white">30 minutes</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
            <span>Audit logging</span>
            <span className="text-emerald-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
            <span>PHI field encryption</span>
            <span className="text-emerald-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
            <span>Role-based access control</span>
            <span className="text-emerald-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-graphite-800/20">
            <span>Password policy</span>
            <span className="text-white">Strong (12+ chars, special)</span>
          </div>
          <p className="text-[10px] text-graphite-600 mt-2 italic">
            This platform is built with compliance-minded engineering principles. Formal HIPAA compliance requires additional organizational controls.
          </p>
        </div>
      </SettingsCard>
    </div>
  )
}

function SettingsCard({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-graphite-800 bg-graphite-900/50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-graphite-500" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}
