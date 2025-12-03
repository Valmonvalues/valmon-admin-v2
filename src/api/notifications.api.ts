import { apiClient } from './apiClient'

export const notifications = {
  notifications: async () => {
    const response = await apiClient.get('/notifications')
    return response.data
  },
}
