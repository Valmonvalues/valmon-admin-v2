import { wallet } from '@/api/wallet.api'
import type { Params } from '@/types/global.type'
import type { WalletData } from '@/types/wallet.types'
import { useQuery } from '@tanstack/react-query'

export const useWallet = () => {
  //   const queryClient = useQueryClient()

  const listingSummary = (params?: Params) => {
    return useQuery<WalletData>({
      queryKey: ['listing', params],
      queryFn: () => wallet.listSummary(params),
    })
  }

  return {
    listingSummary,
  }
}
