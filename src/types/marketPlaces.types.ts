// "data": {
//         "total_users": 72,
//         "service_providers": 40,
//         "employers": 32,
//         "user_status": {
//             "active": 70,
//             "inactive": 0,
//             "suspended": 2
//         },
//         "weekly_growth": {
//             "total_users": "N\/A",
//             "service_providers": "N\/A",
//             "employers": "N\/A"
//         },
//         "topCategories": [],
//         "topServices": {
//             "": 50,
//             "\"service_image\":null": 41,
//             "\"tags\":null": 41,
//             "\"description\":\"\"": 26,
//             "\"primary\":true": 22,
//             "\"primary\":false": 19,
//             "\"image_url\":null": 17,
//             "\"service_category_id\":\"1\"": 16
//         }
//     }

import type { Pagination } from './global.type'

// "totalListingCount": 11,
// "totalListedValue": "123000.00",
// "In_Escrow_Value": 0,
// "In_Escrow_count": 0

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
