import type { UserRole } from './types'

// ── Permission Definitions ───────────────────────────────────

export type Permission =
  | 'patients:read'
  | 'patients:write'
  | 'patients:delete'
  | 'labs:read'
  | 'labs:write'
  | 'vitals:read'
  | 'vitals:write'
  | 'protocols:read'
  | 'protocols:write'
  | 'medications:read'
  | 'medications:write'
  | 'medications:prescribe'
  | 'alerts:read'
  | 'alerts:write'
  | 'alerts:resolve'
  | 'tasks:read'
  | 'tasks:write'
  | 'tasks:assign'
  | 'encounters:read'
  | 'encounters:write'
  | 'refills:read'
  | 'refills:approve'
  | 'messages:read'
  | 'messages:write'
  | 'audit:read'
  | 'settings:read'
  | 'settings:write'
  | 'users:read'
  | 'users:write'
  | 'agent:read'
  | 'agent:execute'
  | 'agent:configure'
  | 'reports:read'
  | 'reports:export'

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'patients:read', 'patients:write', 'patients:delete',
    'labs:read', 'labs:write', 'vitals:read', 'vitals:write',
    'protocols:read', 'protocols:write',
    'medications:read', 'medications:write', 'medications:prescribe',
    'alerts:read', 'alerts:write', 'alerts:resolve',
    'tasks:read', 'tasks:write', 'tasks:assign',
    'encounters:read', 'encounters:write',
    'refills:read', 'refills:approve',
    'messages:read', 'messages:write',
    'audit:read', 'settings:read', 'settings:write',
    'users:read', 'users:write',
    'agent:read', 'agent:execute', 'agent:configure',
    'reports:read', 'reports:export',
  ],
  physician: [
    'patients:read', 'patients:write',
    'labs:read', 'labs:write', 'vitals:read', 'vitals:write',
    'protocols:read', 'protocols:write',
    'medications:read', 'medications:write', 'medications:prescribe',
    'alerts:read', 'alerts:write', 'alerts:resolve',
    'tasks:read', 'tasks:write', 'tasks:assign',
    'encounters:read', 'encounters:write',
    'refills:read', 'refills:approve',
    'messages:read', 'messages:write',
    'audit:read',
    'agent:read', 'agent:execute',
    'reports:read', 'reports:export',
  ],
  clinician: [
    'patients:read', 'patients:write',
    'labs:read', 'vitals:read', 'vitals:write',
    'protocols:read',
    'medications:read',
    'alerts:read', 'alerts:write',
    'tasks:read', 'tasks:write',
    'encounters:read', 'encounters:write',
    'refills:read',
    'messages:read', 'messages:write',
    'agent:read',
    'reports:read',
  ],
  rn_ma: [
    'patients:read',
    'labs:read', 'vitals:read', 'vitals:write',
    'protocols:read',
    'medications:read',
    'alerts:read',
    'tasks:read', 'tasks:write',
    'encounters:read',
    'refills:read',
    'messages:read', 'messages:write',
    'reports:read',
  ],
  admin_ops: [
    'patients:read',
    'tasks:read', 'tasks:write', 'tasks:assign',
    'refills:read',
    'messages:read', 'messages:write',
    'settings:read',
    'users:read',
    'reports:read', 'reports:export',
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  physician: 'Physician / Medical Director',
  clinician: 'Clinician',
  rn_ma: 'RN / MA',
  admin_ops: 'Admin / Operations',
}
