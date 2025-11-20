import type {
  NotificationSettings,
  NotificationSettingsResponse,
  PlatformRateResponse,
  ResetPasswordForm,
} from '@/types/settings.types'
import { apiClient } from './apiClient'

export const settingsApi = {
  getPlatformRate: async (): Promise<PlatformRateResponse> => {
    const response = await apiClient.get('/settings/platform')

    return response.data
  },

  setPlatformRate: async (
    data: PlatformRateResponse,
  ): Promise<PlatformRateResponse> => {
    const response = await apiClient.post('/settings/platform', data)

    return response.data
  },

  resetPassword: async (data: ResetPasswordForm) => {
    const response = await apiClient.post('/password', data)

    return response.data
  },

  getNotification: async () => {
    const response = await apiClient.get('/settings/notifications')

    return response.data
  },

  updateNotification: async (
    data: NotificationSettings,
  ): Promise<NotificationSettingsResponse> => {
    const response = await apiClient.post('/settings/notifications', data)

    return response.data
  },
}
