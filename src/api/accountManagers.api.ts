import type { AccountManager } from '@/types/accountManagers.types'
import { apiClient } from './apiClient'
import type { Id, Params } from '@/types/global.type'

export const accountManagersApi = {
  listManagers: async (params?: Params): Promise<AccountManager[]> => {
    const response = await apiClient.get('/get-admins', { params })
    return response.data
  },

  addManager: async (managerData: FormData) => {
    const response = await apiClient.post('/add-admin', managerData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  deleteManager: async (id: Id) =>
    await apiClient.delete(`/delete-admin/${id}`),
}
