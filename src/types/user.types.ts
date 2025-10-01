import type { Pagination } from './global.type'

export interface User {
  image: string
  name: string
  email: string
  listings_count: number
  join_date: string
  reported_count: number
  type: string
  last_seen_at: string
  status: string
}

export interface UserResponseType {
  data: {
    users: User[]
    pagination: Pagination
  }
}
