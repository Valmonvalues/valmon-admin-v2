import type { UserResponseType } from '@/types/user.types'
import { apiClient } from './apiClient'

export const userApi = {
  list: async (): Promise<UserResponseType> => await apiClient.get('/users'),
}
