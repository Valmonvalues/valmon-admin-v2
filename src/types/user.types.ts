import type { ReactNode } from 'react'
import type { Id, Pagination } from './global.type'

// --- Helper Interfaces for Nested Objects ---

export interface NotificationPreference {
  push_notification: boolean
  message_notification: boolean
  payment_notification: boolean
  email_notification: boolean
}

export interface Address {
  details: string
  street: string
  city: string
  state: string
  country: string
  postal_code: string
}

export interface ServiceDetails {
  id: Id
  name: string
  service_category_id: string
  description: string | null
  service_image: string | null
  tags: string | null
  slug: string
  created_at: string
  updated_at: string
  image_url: string | null
  worker_count: number
  pricing_type: string
  price: boolean
}

export interface UserService {
  service_id: Id
  years_of_experience: number
  primary: boolean
  service: ServiceDetails
}

export interface Gig {
  service_id: Id
  title: string
  pricing_type: string
  price: string
  description: string
  service: ServiceDetails
}

interface WorkingHour {
  day: string
  from: string
  to: string
  open: boolean
}

export interface UserProfile {
  id: Id
  user_id: string
  bio: string
  addresses: Address[]
  services: UserService[]
  gigs: Gig[]
  primary_service_id: string
  working_hours: WorkingHour[]
  country: string | null
  city: string | null
  language: string | null
  state: string | null
  completed_jobs: number
}

export interface Reviewer {
  id: Id
  first_name: string
  last_name: string
  profile_pic: string | null
  account_type: string
  account_status: string
}

export interface Review {
  id: Id
  content: string
  rating: number
  created_at: string
  reviewer: Reviewer
}

export interface GalleryItem {
  id: Id
  asset_url: string
  name: string
}

export interface ListingCategory {
  id: Id
  name: string
}

export interface Listing {
  id: Id
  location: string
  title: string
  price: string
  negotiable: boolean
  condition: string
  description: string
  status: 'ACTIVE' | 'DENIED' | 'PENDING'
  images: string[]
  category: ListingCategory
}

// --- Main User Interface ---

export interface User {
  id: Id
  google_id: string | null
  first_name: string
  last_name: string
  phone: string
  name?: string
  role?: string
  country_code: string
  email: string
  notification_preference: NotificationPreference
  profile_pic: string | null
  avatar_url: string | null
  created_at: string // Corresponds to join_date
  updated_at: string
  account_type: string // Corresponds to type
  account_status: 'ACTIVE' | 'SUSPENDED' | 'BANNED'
  email_verified_at: string | null
  last_seen_at: string
  rating: number
  ratings_count: number
  inbox_response_time: number
  inbox_response_rate: number
  active_jobs_count: number
  profile: UserProfile
  reviews: Review[]
  gallery: GalleryItem[]
  listings: Listing[]
  listings_count: number
  status: string
  reported_count: number
  joined_date: string
}

export type UserListType = {
  id: number
  image: string
  name: string
  email: string
  listings_count: string
  join_date: string
  reported_count: string
  type: string
  last_seen_at: string
  status: string
}

// --- Other Interfaces (Unchanged) ---

export interface StatCardProps {
  title: string
  value?: string | number
  color?: string
  trend?: string | number
  image?: string | ReactNode
  showImage?: boolean
  imageSize?: number
  imageClassName?: string
  children?: ReactNode
}

export interface UserResponseType {
  users: UserListType[]
  pagination: Pagination
}

export interface Profile {
  id: number
  name: string
  email: string
  notification_preference: {
    notifications: boolean
    new_report: boolean
    sales_summary: boolean
    new_user: boolean
  }
  role: 'super_admin' | 'admin' | 'user' | string // extendable
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
  first_name: string
  last_name: string
  image_path: string | null
  profile_pic: string
}
