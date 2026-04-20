import { rolePermissionsApi } from '@/api/rolePermissions.api'
import { userApi } from '@/api/user.api'
import { computePermissionSet } from '@/utils/helper'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

const queryClient = new QueryClient()

export const routeGaurd = async (perms: string[]) => {
  const me = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: userApi.getMe,
  })

  if (!me) {
    throw redirect({ to: '/' })
  }

  const roles = await queryClient.fetchQuery({
    queryKey: ['roles'],
    queryFn: rolePermissionsApi.listAllRoles,
  })

  const canAccessAny = perms.some((perm) =>
    computePermissionSet(me?.role, roles).has(perm),
  )

  if (canAccessAny) {
    return
  } else {
    throw redirect({ to: '/summary' })
  }
}
