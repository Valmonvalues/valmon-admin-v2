import { useRolePermissions } from '@/services/rolePermissions.service'
import { useUser } from '@/services/user.service'
import type { Permission } from '@/types/rolePermissions.types'

export const allowedRoles = {
  summary: ['all'],
  users: ['super_admin', 'admin'],
  skills: ['super_admin', 'admin'],
  marketPlace: ['super_admin', 'admin'],
  wallet: ['super_admin', 'admin'],
  resolution: ['super_admin', 'admin'],
  categoryRequest: ['super_admin', 'admin'],
  settings: ['all'],
  account: ['all'],
}

export function accessManagement() {
  const { data: permissions } = useRolePermissions().getAllPermissions()

  const reducedPermissions = permissions?.reduce<Record<string, Permission[]>>(
    (acc, cur) => {
      const key = cur?.name.split('_')[1]

      // console.log(acc)
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(cur)

      return acc
    },
    {},
  )
  // console.log('permissionNames', reducedPermissions)
}

export function userAccess(accessName: string, action?: string) {
  const { data: roles } = useRolePermissions().getAllRoles()
  const { data: me } = useUser().getMe()

  // console.log(roles)

  const userRolePerm = roles?.find(
    (role) =>
      role.name.split(' ').join('_').toLowerCase() === me?.role.toLowerCase(),
  )?.permissions

  // console.log('userRolePerm', userRolePerm)

  const reducedUserPermissions = userRolePerm?.reduce<
    Record<string, Permission[]>
  >((acc, cur) => {
    const key = cur?.name.split('_')[1]

    if (!acc[key]) {
      acc[key] = []
      acc[key].push(cur)
    }

    // console.log(acc)
    return acc
  }, {})

  // console.log('reducedUserPermissions', reducedUserPermissions)
  return {
    hasAccess: Object.keys(reducedUserPermissions || {}).includes(accessName),
    hasActionAccess: action
      ? reducedUserPermissions?.[accessName]?.find((e) =>
          e.name.includes(action),
        )
      : false,
  }
}
