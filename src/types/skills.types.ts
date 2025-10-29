import type { Id } from '@/types/global.type'

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
  job_time?: string
  skill?: string
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
  total_transactions: number
  transacted_value: number
  valmon_earning: number
}

export interface SubCategory {
  id: Id
  name: string
  total_users: number
  total_transactions: number
  // total_tansactions: number
  transacted_value: number | string
  valmon_earning: number | string
}

// export interface CustomersResponse {
//   data: Customers[]
// }

export interface Customers {
  id: Id
  image: string
  name: string
  email: string
  listings_count: number
  join_date: string
  reported_count: number
  type: 'Service Provider' | string
  last_seen_at: string
  status: 'ACTIVE' | 'INACTIVE' | string
}
