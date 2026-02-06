import type { NotificationItem } from '@/types/notifications.types'
import { apiClient } from './apiClient'

export const notifications = {
  notifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get('/notifications')
    return response.data
  },
}
