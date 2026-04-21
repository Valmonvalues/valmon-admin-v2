import type { NotificationItem } from '@/types/notifications.types'
import { apiClient } from './apiClient'
import type { Id } from '@/types/global.type'

export const notifications = {
  notifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get('/notifications')
    return response.data
  },

  // (id: number | string)
  readNotification: async (id: Id) => {
    const response = await apiClient.post('/notifications/read', { id })
    return response.data
  },

  // (ids: Array<number | string>)
  readAllNotifications: async (ids: Id[]) => {
    const response = await apiClient.post('/notifications/read', { ids })
    return response.data
  },

  // new: fetch unread notifications
  unreadNotifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get('/notifications/unread')
    return response.data
  },
}
