export interface WalletData {
  total_income: string
  total_withdrawal: number
  wallet_balance: string
  percentage_increase: PercentageIncrease
  account_numbers: AccountNumber[]
  transactions: WalletTransaction[]
}

export interface PercentageIncrease {
  income: number
  withdrawal: number
}

export interface AccountNumber {
  [key: string]: any
}

export interface WalletTransaction {
  id: number
  user_id: number | null
  type: 'funding' | 'withdrawal' | string
  amount: string
  currency: string
  status: 'success' | 'failed' | 'pending' | string
  created_at: string
  updated_at: string
  bank_name: string | null
  account_number: string | null
  bank_code: string | null
}

export interface Bank {
  id: number
  name: string
  slug: string
  code: string
  longcode: string
  country: string
  currency: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface BankApiResponse {
  status_code: number
  success: boolean
  message: string
  data: Bank[]
}

export type BankList = Bank[]

export interface WithdrawalPayload {
  account_number: number
  amount: number
  bank: string | undefined
  otp: number
  bank_code: string
}
