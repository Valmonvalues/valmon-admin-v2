import type { ReactNode } from 'react'
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

// "data": {
//     "id": 1,
//     "name": "Valmon Admin",
//     "email": "superadmin@valmon.com",
//     "notification_preference": {
//         "notifications": true,
//         "new_report": true,
//         "sales_summary": true,
//         "new_user": true
//     },
//     "role": "super_admin",
//     "created_at": "2024-11-15T22:07:06.000000Z",
//     "updated_at": "2025-08-22T19:03:12.000000Z",
//     "first_name": "Oluwadunsin",
//     "last_name": "Ajibade",
//     "image_path": null,
//     "profile_pic": "https:\/\/valmon.ctrixx.com\/images\/user.png"
// }

// export interface Me {
//   created_at: '2024-11-15T22:07:06.000000Z'
//   email: 'superadmin@valmon.com'
//   first_name: 'Oluwadunsin'
//   id: 1
//   image_path: null
//   last_name: 'Ajibade'
//   name: 'Valmon Admin'
//   notification_preference: {
//     new_report: boolean
//     new_user: boolean
//     notifications: boolean
//   }

//   sales_summary: boolean
//   profile_pic: string
//   role: string
//   updated_at: string
// }

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
  value?: string | number
  // value: number
  color?: string
  image?: string | ReactNode
  showImage?: boolean
  imageSize?: number
  imageClassName?: string
}

export interface UserResponseType {
  users: UserListType[]
  pagination: Pagination
}
