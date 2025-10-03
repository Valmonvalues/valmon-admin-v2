import type { UserResponseType } from '@/types/user.types'
import { apiClient } from './apiClient'
import type { Pagination } from '@/types/global.type'

export const userApi = {
  list: async (params?: Pagination): Promise<UserResponseType> =>
    await apiClient.get('/users', { params }),
  getUsersSummary: async () => await apiClient.get('/users/summary'),
}
