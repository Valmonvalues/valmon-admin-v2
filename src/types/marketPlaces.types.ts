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
