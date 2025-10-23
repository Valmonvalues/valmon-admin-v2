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
  // Add fields here if account number objects are not just strings or empty
  // For now, using `any` to allow empty array or unknown structure
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
