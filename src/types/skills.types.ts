export interface Transaction {
  id: number
  employer_name: string
  employee_name: string
  category: null
  job_created_at: string
  job_completed_at: null
  amount: string
  to_valmon: string
  date: string
  status: string
}

export interface TransactionResponse {
  // data: {
  transaction_count: number
  all_transactions: Transaction[]
  transaction_count_percentage: number
  transaction_value: number
  transaction_value_percentage: number
  valmon_earning: number
  valmon_earning_percentage: number
  top_categories: []
  // }
}

export interface CategoriesResponse {
  id: number
  name: string
  image: string
  sub_categories_count: number
  total_users: number
  total_transactionst: number
  transaction_value: number
  valmon_earning: number
}
