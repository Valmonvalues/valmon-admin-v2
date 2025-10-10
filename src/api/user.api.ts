import type { User, UserResponseType } from '@/types/user.types'
import { apiClient } from './apiClient'
import type { Id, Params } from '@/types/global.type'

export const userApi = {
  list: async (params?: Params): Promise<UserResponseType> => {
    const response = await apiClient.get('/users', { params })
    return response.data
  },
  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/me')
    console.log(response.data)
    return response.data
  },
  getUser: async (id: Id): Promise<User> => await apiClient.get(`/users/${id}`),
  getUsersSummary: async () => await apiClient.get('/users/summary'),
  deleteUser: async (id: Id) => await apiClient.delete(`/users/${id}`),
}
