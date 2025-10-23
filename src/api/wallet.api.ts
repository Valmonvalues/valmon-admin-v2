import type { Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type { WalletData } from '@/types/wallet.types'

export const wallet = {
  listSummary: async (params?: Params): Promise<WalletData> => {
    const response = await apiClient.get('/transaction/wallet/summary', {
      params,
    })
    return response.data
  },
}
