import type { Permission } from '@/types/rolePermissions.types'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

type AccessManagementRoleContextType = {
  canAccess: (perm: string) => boolean
  canAccessAny: (perm: string[]) => boolean
}

const AccessManagementRoleContext =
  createContext<AccessManagementRoleContextType | null>(null)

export const AccessManagementRoleProvider = ({
  permissions,
  children,
}: {
  children: ReactNode
  permissions: Permission[]
}) => {
  const permissionSet = useMemo(
    () => new Set((permissions ?? []).map((perm) => perm.name)),
    [permissions],
  )

  console.log(permissionSet)
  const value = {
    canAccess: (perm: string) => permissionSet.has(perm),
    canAccessAny: (perms: string[]) =>
      perms.some((perm) => permissionSet.has(perm)),
  }

  return (
    <AccessManagementRoleContext.Provider value={value}>
      {children}
    </AccessManagementRoleContext.Provider>
  )
}

export const useAccessManagementRoleContext = () => {
  const context = useContext(AccessManagementRoleContext)

  if (!context) {
    throw new Error(
      'useAccessManagementRoleContext must be used within AccessManagementRoleProvider',
    )
  }

  return context
}
