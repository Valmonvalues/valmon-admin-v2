import { useMutation } from '@tanstack/react-query'
import { storage } from '@/constant/config'
import { authApi } from '@/api/auth.api'

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      storage.setItem('valmon_adminToken', data.data.token)
    },
  })

  return {
    login: {
      mutate: loginMutation.mutate,
      isLoading: loginMutation.isPending,
      error: loginMutation.error,
    },
  }
}
