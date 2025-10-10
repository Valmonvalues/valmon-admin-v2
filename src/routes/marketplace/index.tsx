import TabHeader from '@/components/TabHeader'
import { ReusableTable } from '@/components/table/ReusableTable'
import DashboardLayout from '@/layout/DashboardLayout'
import { useMarketPlaces } from '@/services/marketPlaces.service'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/marketplace/')({
  component: Marketplace,
})

function Marketplace() {
  const [activeTab, setActiveTab] = useState('Open Listings')
  const { listingSummary } = useMarketPlaces()
  const { data: listing, isLoading: listingIsloading } = listingSummary()
  console.log(listing)

  //   useEffect(() => {
  //   if (!activeTab && tabs.length > 0) {
  //     onChange(tabs[0].id)
  //   }
  // }, [activeTab, tabs, onChange])

  return (
    <DashboardLayout>
      Hello "/marketplace/"!
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
      {/* {activeTab === 'open' && (
        <div className="">
          <ReusableTable
            title="Open Listings"
            totalCount={listing.length}
            // totalCount={10}
            data={sortedTransaction}
            columns={transactionColumns({
              handleView,
              handleDeleteClick,
            })}
            isLoading={skillDataLoader}
            searchQuery={search}
            onSearchChange={setSearch}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      )} */}
      {/* {activeTab === 'awaiting' && <AwaitingApproval />}
      {activeTab === 'closed' && <ClosedTransactions />}
      {activeTab === 'categories' && <Categories />} */}
    </DashboardLayout>
  )
}
