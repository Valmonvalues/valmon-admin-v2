import type { Params } from '@/types/global.type'
import { apiClient, baseApiClient } from './apiClient'
import type {
  BankList,
  WalletData,
  WithdrawalPayload,
} from '@/types/wallet.types'

export const wallet = {
  listSummary: async (params?: Params): Promise<WalletData> => {
    const response = await apiClient.get('/transaction/wallet/summary', {
      params,
    })
    return response.data
  },

  sendOtp: async () => {
    const response = await apiClient.post('/wallet/withdraw/otp')
    return response.data
  },

  postWithdrawal: async (data: WithdrawalPayload) => {
    const response = await apiClient.post('/wallet/withdraw', data)
    return response.data
  },

  listBanks: async (): Promise<BankList> => {
    const response = await baseApiClient.get('/get/banks')
    return response.data
  },
}
