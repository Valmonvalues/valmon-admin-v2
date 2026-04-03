import { routeGaurd } from '@/middleware/routeGuard'
import { allowedRoles } from '@/data/roles'
import DashboardLayout from '@/layout/DashboardLayout'
import { useMarketPlaces } from '@/services/marketPlaces.service'

import { createFileRoute } from '@tanstack/react-router'
import MarketListingDetail from '@/components/pages/marketPlace/MarketListingDetail'
import MarketCategoryListing from '@/components/pages/marketPlace/MarketCategoryListing'
import type { Id } from '@/types/global.type'
import { useState } from 'react'
import type { TypeProps } from '..'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/',
)({
  component: MarketPlaceProduct,
  loader: () => routeGaurd(allowedRoles?.marketPlace),
  validateSearch: (search: { type: TypeProps; category: Id }) => {
    return {
      type: search.type || undefined,
      category: search.category || undefined,
    }
  },
})

// function InfoRow({ label, value }: InfoRowProps) {
//   return (
//     <div className="flex justify-between items-center border-t border-gray-100 py-1">
//       <Text fz="sm" fw={500}>
//         {label}:
//       </Text>
//       <Text fz="sm" fw={500} c="dimmed">
//         {value || '-'}
//       </Text>
//     </div>
//   )
// }

function MarketPlaceProduct() {
  const { marketPlaceId } = Route.useParams()
  const { type, category } = Route.useSearch()
  const [page, setPage] = useState(1)
  const { listingId, listingByCategory, listingByCategoryId } =
    useMarketPlaces()
  const { data: listing } = listingId(marketPlaceId, type)
  const { data: listingCategory, isLoading: listingCategoryIsLoading } =
    listingByCategory(marketPlaceId, { page, category })
  const { data: categoryListing, isLoading: listingCategoryIdIsLoading } =
    listingByCategoryId(marketPlaceId)

  function renderView() {
    switch (type) {
      case 'open':
        return <MarketListingDetail listing={listing} />

      case 'categories':
        return (
          <MarketCategoryListing
            categoryListing={categoryListing}
            listingCategoryIsLoading={listingCategoryIsLoading}
            listingCategory={listingCategory}
            listingCategoryIdIsLoading={listingCategoryIdIsLoading}
            page={page}
            setPage={setPage}
          />
        )

      default:
        return <MarketListingDetail listing={listing} />
    }
  }

  return <DashboardLayout>{renderView()}</DashboardLayout>
}
