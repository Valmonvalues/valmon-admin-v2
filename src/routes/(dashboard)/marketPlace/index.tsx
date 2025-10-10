import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'
import TabHeader from '@/components/TabHeader'
import { ReusableTable } from '@/components/table/ReusableTable'
import { useMarketPlaces } from '@/services/marketPlaces.service'
import { useEffect, useState } from 'react'
import { perPage as perpage } from '@/constant/config'
import type { ListingItem } from '@/types/marketPlaces.types'
import useSortedData from '@/hook/sortData'
import { listingColumns } from '@/columns/listingColumns'
// import { listingColumns, type ListingItem } from '@/columns/listingColumns'

export const Route = createFileRoute('/(dashboard)/marketPlace/')({
  component: MarketPlace,
})

function MarketPlace() {
  const [activeTab, setActiveTab] = useState('open')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { listingSummary } = useMarketPlaces()
  const { data: listing, isLoading: listingIsloading } = listingSummary({
    page,
    perpage,
  })
  const allOpenListing = listing?.all_listings ?? []
  console.log(allOpenListing)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ListingItem
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })
  const totalUsers = listing?.pagination?.total ?? 0
  const totalPages = Math.ceil(totalUsers / perpage)

  // const sortedUsers = useSortedData(listing!, sortConfig)

  const handleSort = (key: keyof ListingItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // const handleView = (userId: Id) => {
  //   navigate({ to: `/users/${userId}` })
  // }

  // const handleDeleteClick = (userId: Id) => {
  //   setSelectedUser(userId)
  //   setDeleteModalOpen(true)
  // }

  const handleConfirmDelete = () => {
    // deleteUser.mutate(selectedUser as Id, {
    //   onSuccess: () => {
    //     setSelectedUser(null)
    //     setDeleteModalOpen(false)
    //   },
    //   onError: (error) => {
    //     console.error('Error deleting user:', error)
    //     notifications.show({
    //       title: 'Error',
    //       message: 'Failed to delete user. Please try again.',
    //       color: 'red',
    //     })
    //   },
    // })
  }

  return (
    <DashboardLayout>
      <div>
        Hello "/(dashboard)/marketPlace/"!{' '}
        <div className="mb-4">
          <TabHeader
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'open', label: 'Open Listings' },
              { id: 'awaiting', label: 'Awaiting Approval' },
              { id: 'closed', label: 'Closed Transaction' },
              { id: 'categories', label: 'Categories' },
            ]}
          />
        </div>
        {/* {activeTab === 'open' && <OpenListings />}
      {activeTab === 'awaiting' && <AwaitingApproval />}
      {activeTab === 'closed' && <ClosedTransactions />}
      {activeTab === 'categories' && <Categories />} */}
        {activeTab === 'open' && (
          <div className="">
            <ReusableTable
              title="Open Listings"
              totalCount={allOpenListing.length}
              // totalCount={10}
              // data={sortedTransaction}
              columns={listingColumns({
                page,
                // handleView,
                // handleDeleteClick,
                handleView: (id) => console.log('View', id),
                handleDeleteClick: (id) => console.log('Delete', id),
              })}
              isLoading={listingIsloading}
              searchQuery={search}
              onSearchChange={setSearch}
              data={[]}
              sortConfig={{
                key: 'image',
                direction: 'desc',
              }}
              onSort={function (key: keyof ListingItem): void {
                throw new Error('Function not implemented.')
              }} // sortConfig={sortConfig}
              // onSort={handleSort}
            />
          </div>
        )}
        {/* {activeTab === 'awaiting' && <AwaitingApproval />}
      {activeTab === 'closed' && <ClosedTransactions />}
      {activeTab === 'categories' && <Categories />} */}
      </div>
    </DashboardLayout>
  )
}
