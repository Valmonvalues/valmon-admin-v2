import { settingsApi } from '@/api/settings.api'
import type {
  NotificationSettings,
  PlatformRateResponse,
  ResetPasswordForm,
} from '@/types/settings.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSettings = () => {
  const queryClient = useQueryClient()

  const getPlatformRate = () => {
    return useQuery({
      queryKey: ['platformRate'],
      queryFn: settingsApi.getPlatformRate,
    })
  }

  const getNotificationSettings = () => {
    return useQuery({
      queryKey: ['notification'],
      queryFn: settingsApi.getNotification,
    })
  }

  const updateNotificationSettings = useMutation({
    mutationFn: (data: NotificationSettings) =>
      settingsApi.updateNotification(data),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Updated notification preferences',
        color: 'green',
      })
    },
  })

  const setPlatformRate = useMutation({
    mutationFn: (data: PlatformRateResponse) =>
      settingsApi.setPlatformRate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plaformRate'] })
      notifications.show({
        title: 'Success',
        message: 'Platform Rate set successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message:
          error.response?.data?.message || 'Failed to add set Platform Rate',
        color: 'red',
      })
    },
  })

  const resetPassword = useMutation({
    mutationFn: (data: ResetPasswordForm) => settingsApi.resetPassword(data),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Password reset successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error?.message || 'Failed to reset password',
        color: 'red',
      })
    },
  })

  return {
    getPlatformRate,
    getNotificationSettings,
    updateNotificationSettings,
    setPlatformRate,
    resetPassword,
  }
}
