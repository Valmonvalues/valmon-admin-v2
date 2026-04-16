import { rolePermissionsApi } from '@/api/rolePermissions.api'
import type { Id } from '@/types/global.type'
import type { NewRole } from '@/types/rolePermissions.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useRolePermissions = () => {
  const queryClient = useQueryClient()

  const getAllPermissions = () => {
    return useQuery({
      queryKey: ['permissions'],
      queryFn: rolePermissionsApi.listAllPermissions,
    })
  }

  const getAllRoles = () => {
    return useQuery({
      queryKey: ['roles'],
      queryFn: rolePermissionsApi.listAllRoles,
    })
  }

  const getRoleById = (id: Id) => {
    return useQuery({
      queryKey: ['roles', id],
      queryFn: () => rolePermissionsApi.listRoleById(id),
      enabled: !!id,
    })
  }

  const createRole = useMutation({
    mutationFn: (payload: NewRole) => rolePermissionsApi.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })

  const updateRole = useMutation({
    mutationFn: ({ id, payload }: { id: Id; payload: NewRole }) =>
      rolePermissionsApi.updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })

  const deleteRole = useMutation({
    mutationFn: (id: Id) => rolePermissionsApi.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })

  return {
    getAllPermissions,
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
  }
}

// const isCreating = !selectedRoleId || selectedRoleId === 0

// if (isCreating) {
//   createNewRole(payload)
// } else {
//   updateRole(payload) // future
// }
