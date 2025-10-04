import type { Id, Pagination } from './global.type'

export interface User {
  id: Id
  first_name: string
  last_name: string
  image: string
  name: string
  email: string
  listings_count: number
  ratings_count: number
  rating: number
  profile: {
    bio: string
    location: string
    addresses: {
      id: Id
      street: string
      city: string
      state: string
      country: string
      zip_code: string
      is_primary: boolean
    }[]
    services: {
      id: Id
      service: {
        id: Id
        name: string
      }
    }[]
  }
  location: string
  account_status: string
  profile_pic: string
  join_date: string
  reported_count: number
  active_jobs_count: number
  type: string
  last_seen_at: string
  status: string
}

export interface UserListType {
  id: Id
  first_name: string
  last_name: string
  image: string
  name: string
  email: string
  listings_count: number
  ratings_count: number
  rating: number
  profile: {
    bio: string
    location: string
    addresses: {
      id: Id
      street: string
      city: string
      state: string
      country: string
      zip_code: string
      is_primary: boolean
    }[]
    services: {
      id: Id
      service: {
        id: Id
        name: string
      }
    }[]
  }
  location: string
  account_status: string
  profile_pic: string
  join_date: string
  reported_count: number
  active_jobs_count: number
  type: string
  last_seen_at: string
  status: string
}

export interface StatCardProps {
  title: string
  value: number
  color: string
}

export interface UserResponseType {
  users: UserListType[]
  pagination: Pagination
}
