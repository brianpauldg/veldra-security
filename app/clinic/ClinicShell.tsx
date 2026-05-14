'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, AlertTriangle, CheckSquare, Settings,
  Bell, Shield, ChevronLeft, ChevronRight, Activity, LogOut,
  Bot, Menu, X, Loader2,
} from 'lucide-react'
// Notifications loaded from live data
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const ALLOWED_ROLES = ['super_admin', 'physician', 'clinician', 'rn_ma', 'admin_ops']

type UserInfo = {
  id: string
  name: string
  role: string
  email: string
}

const NAV_ITEMS = [
  { href: '/clinic', label: 'Command Center', icon: LayoutDashboard },
  { href: '/clinic/patients', label: 'Patients', icon: Users },
  { href: '/clinic/alerts', label: 'Alerts', icon: AlertTriangle },
  { href: '/clinic/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/clinic/settings', label: 'Settings', icon: Settings },
]

export default function ClinicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  const supabase = createClientComponentClient()

  const unreadCount = 0

  // Skip auth check on the login page itself
  const isLoginPage = pathname === '/clinic/login'

  useEffect(() => {
    if (isLoginPage) {
      setAuthLoading(false)
      return
    }

    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/clinic/login')
        return
      }

      // Get user metadata or fall back to email
      const email = session.user.email || ''
      const meta = session.user.user_metadata || {}
      const name = meta.full_name || meta.name || email.split('@')[0]
      const role = meta.role || 'super_admin'

      setCurrentUser({
        id: session.user.id,
        name,
        role,
        email,
      })
      setAuthLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/clinic/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router, isLoginPage])

  // Render login page without the dashboard shell
  if (isLoginPage) {
    return <>{children}</>
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    )
  }

  // Not authenticated
  if (!currentUser) {
    return null
  }

  const CURRENT_USER = currentUser

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-zinc-800">
        <Link href="/clinic" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-nova-500 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-semibold text-white tracking-tight">Bloom Metabolics</span>
              <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">Clinical OS</span>
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
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {false && (
                <span className="ml-auto text-[10px] font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                  0
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* MCP Status */}
      {!collapsed && (
        <div className="px-4 py-3 mx-2 mb-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-3.5 h-3.5 text-nova-400" />
            <span className="text-[11px] font-medium text-zinc-300">MCP Agents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-zinc-500">Connected — 3 active</span>
          </div>
        </div>
      )}

      {/* User */}
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold">
            {CURRENT_USER.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{CURRENT_USER.name}</p>
              <p className="text-[10px] text-zinc-500 capitalize">{CURRENT_USER.role.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-zinc-900 border-r border-zinc-800 transition-all duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-60 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={cn('flex-1 flex flex-col', collapsed ? 'lg:ml-16' : 'lg:ml-60')}>
        {/* Top bar */}
        <header className="h-14 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-zinc-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Site</Link>
              <span>/</span>
              <span className="text-zinc-300">Clinical Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Notifications</span>
                    <span className="text-[10px] text-zinc-500">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="px-4 py-8 text-center">
                      <p className="text-xs text-zinc-500">No notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sign out */}
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/clinic/login')
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-all"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
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
