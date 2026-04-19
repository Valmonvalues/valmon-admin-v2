import { routeGaurd } from '@/middleware/routeGuard'
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
  loader: () =>
    routeGaurd([
      'view_open_listings',
      'manage_open_listings',
      'view_awaiting_approval_listings',
      'manage_awaiting_approval_listings',
      'view_closed_transactions',
      'manage_closed_transactions',
      'view_marketplace_categories',
      'manage_marketplace_categories',
    ]),
  validateSearch: (search: { type: TypeProps; category: Id }) => {
    return {
      type: search.type || undefined,
      category: search.category || undefined,
    }
  },
})

function MarketPlaceProduct() {
  const { marketPlaceId } = Route.useParams()
  const { type, category } = Route.useSearch()
  const [page] = useState(1)
  const { listingId, listingByCategory, listingByCategoryId } =
    useMarketPlaces()
  const { data: listing } = listingId(marketPlaceId, type)
  const { data: listingCategory, isLoading: listingCategoryIsLoading } =
    listingByCategory(marketPlaceId, { page, category })
  const { data: categoryListing } = listingByCategoryId(marketPlaceId)

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
            page={page}
            // setPage={setPage}
          />
        )

      default:
        return <MarketListingDetail listing={listing} />
    }
  }

  return <DashboardLayout>{renderView()}</DashboardLayout>
}
