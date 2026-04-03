import { listingCategoryColumns } from '@/columns/listingCategoryColumns'
import { BackButton } from '@/components/BackButton'
import StatCard from '@/components/StatCard'
import { ReusableTable } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
import type {
  CategoryItem,
  ListingCategoryItems,
  ListingCategoryItemsResponse,
  ListingItem,
  MarketplaceListingIdData,
  MarketplaceListingIdResponse,
} from '@/types/marketPlaces.types'
import { formatNumber } from '@/utils/formatters'
import { useState } from 'react'

type MarketCategoryListingProps = {
  page: number
  setPage: (page: number) => void
  listingCategory?: ListingCategoryItemsResponse
  categoryListing?: CategoryItem

  listingCategoryIsLoading: boolean
  listingCategoryIdIsLoading: boolean
}

function MarketCategoryListing({
  page,
  setPage,
  listingCategory,
  categoryListing,
  listingCategoryIsLoading,
  listingCategoryIdIsLoading,
}: MarketCategoryListingProps) {
  // const [sortConfig, setSortConfig] = useState<{
  //   key: keyof ListingCategoryItems
  //   direction: 'asc' | 'desc'
  // }>({ key: 'product name', direction: 'asc' })

  const handleView = (id: Id) => {
    console.log(id, 'View Page')
  }

  console.log('View Page', listingCategory?.data)

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
        totalCount={listingCategory?.total ?? 0}
        data={listingCategory?.data ?? []}
        columns={listingCategoryColumns({
          page,
          handleView,
          // buttonLayout: 'horizontal',
          // showActions: ['approve', 'reject', 'view'],
        })}
        isLoading={listingCategoryIsLoading}
        // searchQuery={search}
        // onSearchChange={handleSearch}
        // sortConfig={sortConfig}
        // onSort={handleSort}
      />
    </div>
  )
}

export default MarketCategoryListing
