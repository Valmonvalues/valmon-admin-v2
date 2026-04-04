import { listingCategoryColumns } from '@/columns/listingCategoryColumns'
import { BackButton } from '@/components/BackButton'
import StatCard from '@/components/StatCard'
import { ReusableTable } from '@/components/table/ReusableTable'
import useSortedData from '@/hook/sortData'
import type { Id } from '@/types/global.type'
import type {
  CategoryItem,
  ListingCategoryItems,
  ListingCategoryItemsResponse,
  ListingItem,
} from '@/types/marketPlaces.types'
import { formatNumber } from '@/utils/formatters'
import { capitalizeKey } from '@/utils/helper'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

type MarketCategoryListingProps = {
  page: number
  // setPage: (page: number) => void
  listingCategory?: ListingCategoryItemsResponse
  categoryListing?: CategoryItem

  listingCategoryIsLoading: boolean
}

function MarketCategoryListing({
  page,
  listingCategory,
  categoryListing,
  listingCategoryIsLoading,
}: MarketCategoryListingProps) {
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ListingCategoryItems
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const handleSort = (key: keyof ListingItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortedListings = useSortedData(
    capitalizeKey(
      listingCategory?.data || ([] as ListingCategoryItems[]),
      'name',
    ),
    sortConfig,
  )

  const handleView = (itemId: Id) => {
    navigate({
      to: `/marketPlace/${itemId}`,
      // search: { type: activeTab as TypeProps, category: itemId },
    })
  }

  return (
    <div>
      <div className="flex-none pb-5">
        <BackButton color="black" className="min-w-[100px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
        <StatCard title="Category Name" value={categoryListing?.name} />
        <StatCard
          title="Total Products"
          value={categoryListing?.products_listed}
        />
        <StatCard
          title="Active Listing Cost"
          value={`NGN ${formatNumber(categoryListing?.active_listings_cost ?? 0)}`}
        />
        <StatCard title="Sold Amount" value={categoryListing?.sold_amount} />
      </div>

      <ReusableTable<ListingCategoryItems>
        title="All Products under this category on the platform"
        totalCount={listingCategory?.data.length ?? 0}
        data={sortedListings}
        columns={listingCategoryColumns({
          page,
          handleView,
        })}
        isLoading={listingCategoryIsLoading}
        // searchQuery={search}
        // onSearchChange={handleSearch}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  )
}

export default MarketCategoryListing
