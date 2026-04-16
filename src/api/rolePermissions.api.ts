import type { NewRole, Permission, Role } from '@/types/rolePermissions.types'
import { apiClient } from './apiClient'
import type { Id } from '@/types/global.type'

export const rolePermissionsApi = {
  listAllPermissions: async (): Promise<Permission[]> => {
    const response = await apiClient.get('/permissions')
    return response as unknown as Permission[]
  },

  listAllRoles: async (): Promise<Role[]> => {
    const response = await apiClient.get('/roles')
    return response as unknown as Role[]
  },

  listRoleById: async (id: Id): Promise<Role> => {
    const response = await apiClient.get(`/roles/${id}`)
    return response as unknown as Role
  },

  createRole: async (payload: NewRole): Promise<Role> =>
    await apiClient.post('/roles', payload),

  updateRole: async (id: Id, payload: NewRole): Promise<Role> =>
    await apiClient.put(`/roles/${id}`, payload),

  deleteRole: async (id: Id): Promise<void> =>
    await apiClient.delete(`/roles/${id}`),
}
