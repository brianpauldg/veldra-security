'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, AlertTriangle, CheckSquare, Settings,
  Bell, Shield, ChevronLeft, ChevronRight, Activity, LogOut,
  Bot, Menu, X,
} from 'lucide-react'
import { SEED_NOTIFICATIONS } from '@/lib/clinic/seed-data'

// Auth gate — only super_admin + physician can access
const ALLOWED_ROLES = ['super_admin', 'physician']
const CURRENT_USER = {
  id: 'usr_admin_001',
  name: 'Brian DeGuzman',
  role: 'super_admin' as const,
  email: 'brian@novahealth.com',
}

const NAV_ITEMS = [
  { href: '/clinic', label: 'Command Center', icon: LayoutDashboard },
  { href: '/clinic/patients', label: 'Patients', icon: Users },
  { href: '/clinic/alerts', label: 'Alerts', icon: AlertTriangle },
  { href: '/clinic/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/clinic/settings', label: 'Settings', icon: Settings },
]

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const unreadCount = SEED_NOTIFICATIONS.filter(n => !n.isRead).length

  // Auth check
  if (!ALLOWED_ROLES.includes(CURRENT_USER.role)) {
    return (
      <div className="min-h-screen bg-graphite-950 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-graphite-400">You do not have permission to access the clinical dashboard.</p>
          <Link href="/" className="mt-6 inline-block text-nova-400 hover:text-nova-300 transition-colors">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-graphite-800">
        <Link href="/clinic" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-nova-500 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-semibold text-white tracking-tight">Nova Health</span>
              <span className="block text-[10px] text-graphite-500 uppercase tracking-widest">Clinical OS</span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== '/clinic' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-nova-500/10 text-nova-400 border border-nova-500/20'
                  : 'text-graphite-400 hover:text-white hover:bg-graphite-800/50 border border-transparent'
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {item.href === '/clinic/alerts' && !collapsed && (
                <span className="ml-auto text-[10px] font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                  {SEED_NOTIFICATIONS.filter(n => n.type === 'alert' && !n.isRead).length}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* MCP Status */}
      {!collapsed && (
        <div className="px-4 py-3 mx-2 mb-2 rounded-lg bg-graphite-800/50 border border-graphite-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-3.5 h-3.5 text-nova-400" />
            <span className="text-[11px] font-medium text-graphite-300">MCP Agents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-graphite-500">Connected — 3 active</span>
          </div>
        </div>
      )}

      {/* User */}
      <div className="border-t border-graphite-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-nova-600 flex items-center justify-center text-white text-xs font-bold">
            BD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{CURRENT_USER.name}</p>
              <p className="text-[10px] text-graphite-500 capitalize">{CURRENT_USER.role.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-graphite-950 flex">
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-graphite-900 border-r border-graphite-800 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-graphite-800 border border-graphite-700 flex items-center justify-center text-graphite-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-60 bg-graphite-900 border-r border-graphite-800 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={cn('flex-1 flex flex-col', collapsed ? 'lg:ml-16' : 'lg:ml-60')}>
        {/* Top bar */}
        <header className="h-14 bg-graphite-900/80 backdrop-blur-sm border-b border-graphite-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-graphite-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-xs text-graphite-500">
              <Link href="/" className="hover:text-graphite-300 transition-colors">Site</Link>
              <span>/</span>
              <span className="text-graphite-300">Clinical Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-graphite-400 hover:text-white transition-colors"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-graphite-900 border border-graphite-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-graphite-800 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Notifications</span>
                    <span className="text-[10px] text-graphite-500">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {SEED_NOTIFICATIONS.slice(0, 8).map(n => (
                      <Link
                        key={n.id}
                        href={n.actionUrl || '/clinic'}
                        onClick={() => setShowNotifications(false)}
                        className={cn(
                          'block px-4 py-3 border-b border-graphite-800/50 hover:bg-graphite-800/50 transition-colors',
                          !n.isRead && 'bg-graphite-800/20'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {!n.isRead && <div className="w-1.5 h-1.5 rounded-full bg-nova-400 mt-1.5 shrink-0" />}
                          <div>
                            <p className="text-xs font-medium text-white">{n.title}</p>
                            <p className="text-[11px] text-graphite-400 mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back to site */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-graphite-400 hover:text-white border border-graphite-700 rounded-lg hover:bg-graphite-800 transition-all"
            >
              <LogOut className="w-3 h-3" />
              <span>Site</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
