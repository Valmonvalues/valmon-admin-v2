import { useRolePermissions } from '@/services/rolePermissions.service'
import { useUser } from '@/services/user.service'
import { computePermissionSet } from '@/utils/helper'

export const useAccessManagement = () => {
  const { data: me } = useUser().getMe()
  const { data: roles } = useRolePermissions().getAllRoles()

  return {
    canAccess: (perm: string) =>
      computePermissionSet(me?.role, roles).has(perm),
    canAccessAny: (perms: string[]) =>
      perms.some((perm) => computePermissionSet(me?.role, roles).has(perm)),
  }
}
