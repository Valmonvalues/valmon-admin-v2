import type { Profile, User, UserResponseType } from '@/types/user.types'
import { apiClient } from './apiClient'
import type { Id, Params } from '@/types/global.type'

export const userApi = {
  list: async (params?: Params): Promise<UserResponseType> => {
    const response = await apiClient.get('/users', { params })
    return response.data
  },
  getMe: async (): Promise<Profile> => {
    const response = await apiClient.get('/me')
    return response.data
  },
  getUser: async (id: Id): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },
  suspendUser: async (id: Id) => await apiClient.put(`/users/${id}/suspend`),
  restoreUser: async (id: Id) => await apiClient.put(`/users/${id}/restore`),
  getUsersSummary: async () => await apiClient.get('/users/summary'),
  deleteUser: async (id: Id) => await apiClient.delete(`/users/${id}`),
}
