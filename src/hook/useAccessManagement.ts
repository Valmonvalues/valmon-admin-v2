import { useRolePermissions } from '@/services/rolePermissions.service'
import { useUser } from '@/services/user.service'
import { useMemo } from 'react'

export const useAccessManagement = () => {
  const { data: me } = useUser().getMe()
  const { data: roles } = useRolePermissions().getAllRoles()

  const permissions = roles?.find(
    (role) =>
      role.name.split(' ').join('_').toLowerCase() === me?.role.toLowerCase(),
  )?.permissions

  const permissionSet = useMemo(
    () => new Set((permissions ?? []).map((perm) => perm.name)),
    [permissions],
  )

  return {
    canAccess: (perm: string) => permissionSet.has(perm),
    canAccessAny: (perms: string[]) =>
      perms.some((perm) => permissionSet.has(perm)),
  }
}
