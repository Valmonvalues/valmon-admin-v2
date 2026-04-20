import type { Role } from '@/types/rolePermissions.types'
import { notifications } from '@mantine/notifications'
import { redirect } from '@tanstack/react-router'

export const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString)?.toLocaleDateString('en-GB')
}

export function capitalizeKey<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  key: K,
): T[] {
  return data.map((item) => {
    const value = item[key]

    if (typeof value !== 'string' || value?.length === 0) return item

    const capitalized = value?.charAt(0)?.toUpperCase() + value?.slice(1)

    return {
      ...item,
      [key]: capitalized,
    }
  })
}

export const computePermissionSet = (userRole?: string, roles?: Role[]) => {
  const permissions = roles?.find(
    (role) =>
      role.name.split(' ').join('_').toLowerCase() === userRole?.toLowerCase(),
  )?.permissions

  if (!permissions) {
    throw redirect({ to: '/' })
  }

  return new Set((permissions ?? []).map((perm) => perm.name))
}

export const accessBlocker = (
  canAccess: (perm: string) => boolean,
  permission: string,
  message = 'You do not have access to the action. Please contact support',
) => {
  if (!canAccess(permission)) {
    notifications.show({
      title: 'Access Denied',
      message: message,
      color: 'red',
    })
    return false // Denied access, return false
  }
  return true // Access granted, return true
}
