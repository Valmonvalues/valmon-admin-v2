import type { UserResponseType } from '@/types/user.types'
import { apiClient } from './apiClient'
import type { Id, Pagination, Params } from '@/types/global.type'

export const userApi = {
  list: async (params?: Params): Promise<UserResponseType> =>
    await apiClient.get('/users', { params }),
  getUser: async (id: Id) => await apiClient.get(`/users/:${id}`),
  getUsersSummary: async () => await apiClient.get('/users/summary'),
}
