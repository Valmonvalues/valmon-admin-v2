import type { Pagination } from './global.type'

export interface ListingItem {
  id: number
  image: string | null
  name: string
  condition: string
  color: string
  category: string
  price: string
  seller_name: string
  seller_image: string
  listing_date: string
  status: string
}

export interface CategoryItem {
  id: number
  name: string
  products_listed: string
  products_sold: number
  active_listings_cost: number
}

// export interface Approval {
//   total_awaiting: number
//   awaiting_value: number
// }

export interface Markeplace {
  total_users: number
  service_providers: number
  employers: number
  user_status: {
    active: number
    inactive: number
    suspended: number
  }
  weekly_growth: {
    total_users: any
    service_providers: any
    employers: any
  }
  topCategories: Object
  topServices: Object
}

export interface MarketplaceResponse {
  all_listings: ListingItem[]
  totalListingCount: number
  totalListedValue: string
  In_Escrow_Value: number
  In_Escrow_count: number
  marketPlace: Markeplace
  //   approval: Approval
  total_awaiting: number
  awaiting_value: number
  pagination: Pagination
}

// For listing Id

export interface MarketplaceListingIdResponse {
  data: MarketplaceListingIdData
}

export interface MarketplaceListingIdData {
  id: number
  listing_category_id: string
  user_id: string
  location: string
  title: string
  color: string
  price: string
  negotiable?: boolean
  condition?: string
  description: string
  created_at: string
  updated_at: string
  status: string
  deleted_at?: string | null
  images: string[]
  category?: CategoryListingId
  user: MarketplaceListingIdUser
  conversation_id?: string | null
}

export interface CategoryListingId {
  id: number
  name: string
  status: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface MarketplaceListingIdUser {
  id: number
  first_name: string
  last_name: string
  rating: number
  profile_pic: string
  ratings_count: number
  inbox_response_time: number
  inbox_response_rate: number
  active_jobs_count: number
  profile: UserProfileListingId
}

export interface UserProfileListingId {
  id: number
  user_id: string
  bio: string | null
  addresses: Address[]
  services: ServiceExperience[]
  gigs: unknown | null
  primary_service_id: string
  working_hours: WorkingHour[]
  country: string | null
  city: string | null
  language: string | null
  state: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
  image_url: string | null
  completed_jobs: number
}

export interface Address {
  details: string
  street: string
  city: string
  state: string
  country: string
  postal_code: string
}

export interface ServiceExperience {
  service_id: number
  years_of_experience: string
  primary: boolean
  service: Service
}

export interface Service {
  id: number
  name: string
  service_category_id: string
  description: string
  service_image: string | null
  tags: string | null
  slug: string
  created_at: string
  updated_at: string
  image_url: string | null
}

export interface WorkingHour {
  day: string
  from: string
  to: string
  open: boolean
}
