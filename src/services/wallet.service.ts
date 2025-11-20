import { wallet } from '@/api/wallet.api'
import type { Params } from '@/types/global.type'
import type {
  BankList,
  WalletData,
  WithdrawalPayload,
} from '@/types/wallet.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  //   const queryClient = useQueryClient()

  const listingSummary = (params?: Params) => {
    return useQuery<WalletData>({
      queryKey: ['listing', params],
      queryFn: () => wallet.listSummary(params),
    })
  }

  const sendWithdrawOtp = useMutation({
    mutationFn: () => wallet.sendOtp(),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Sent user otp',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error?.message || "Couldn't send otp",
        color: 'red',
      })
    },
  })

  const withdrawal = useMutation({
    mutationFn: (data: WithdrawalPayload) => wallet.postWithdrawal(data),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Withdraw Successful',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error?.message || 'Failed Withdraw',
        color: 'red',
      })
    },
  })

  const listingBanks = () => {
    return useQuery<BankList>({
      queryKey: ['banks'],
      queryFn: () => wallet.listBanks(),
    })
  }

  return {
    listingSummary,
    sendWithdrawOtp,
    withdrawal,
    listingBanks,
  }
}
