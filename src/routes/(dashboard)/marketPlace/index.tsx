import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TabHeader from '@/components/TabHeader'
import { ReusableTable } from '@/components/table/ReusableTable'
import { useMarketPlaces } from '@/services/marketPlaces.service'
import { useEffect, useState } from 'react'
import { perPage as perpage } from '@/constant/config'
import type { CategoryItem, ListingItem } from '@/types/marketPlaces.types'
import useSortedData from '@/hook/sortData'
import { listingColumns } from '@/columns/listingColumns'
import type { Id } from '@/types/global.type'
import { categoryColumns } from '@/columns/categoryColumns'
import BaseButton from '@/components/BaseButton'
import StatCard from '@/components/StatCard'

import shop from '@/assets/icons/shop.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'
import convertShape from '@/assets/icons/convertshape.svg'
import { formatNumber } from '@/utils/formatters'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import { useHandleDelete } from '@/hook/useHandleDelete'
import { useHandleApproveDeny } from '@/hook/useHandleApproveDeny'
import { useGlobalContext } from '@/contexts/GlobalContext'
import { routeGaurd } from '@/middleware/routeGuard'
import { capitalizeKey } from '@/utils/helper'
import { PaginationControls } from '@/components/table/PaginationControls'
import NoAccess from '@/components/NoAccess'
import { useAccessManagement } from '@/hook/useAccessManagement'

export type TypeProps = 'open' | 'approval' | 'closed' | 'categories'

export const Route = createFileRoute('/(dashboard)/marketPlace/')({
  component: MarketPlace,
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
})

function MarketPlace() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('open')
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const { handleApprove, handleReject } = useHandleApproveDeny()
  const { setOpenFormModal } = useGlobalContext()
  const { canAccess } = useAccessManagement()

  const [page, setPage] = useState(1)
  const {
    listingSummary,
    listingApproval,
    listingClosed,
    listingCategories,
    addCategory,
    deleteProduct,
    // deleteClosed,
    deleteCategories,
  } = useMarketPlaces()

  const getDeleteMutation = () => {
    switch (activeTab) {
      case 'open':
        return deleteProduct
      // case 'closed':
      //   return deleteClosed
      case 'categories':
        return deleteCategories
      default:
        return deleteProduct
    }
  }

  const {
    // selectedId: selectedManager,
    modalOpen: deleteModalOpen,
    setModalOpen: setDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHandleDelete({
    mutation: getDeleteMutation(),
    entityName: 'marketplace',
  })

  const { data: listing, isLoading: listingIsloading } = listingSummary({
    page,
    perpage,
    search: debouncedSearch || undefined,
  })

  const { data: approval, isLoading: approvalIsloading } = listingApproval({
    page,
    perpage,
    search: debouncedSearch || undefined,
  })

  const { data: closed, isLoading: closedIsloading } = listingClosed({
    page,
    perpage,
    search: debouncedSearch || undefined,
  })

  const { data: categories, isLoading: categoriesIsloading } =
    listingCategories({
      page,
      perpage,
      search: debouncedSearch || undefined,
    })

  const allOpenListing = listing?.data ?? []
  // const totalListings = listing?.pagination?.total ?? 0
  const totalListings = listing?.total ?? 0

  const allApprovalListing = approval?.all_listings?.data ?? []
  // const totalApprovals = approval?.pagination?.total ?? 0
  const totalApprovals = approval?.total_awaiting ?? 0

  const allClosedListing = closed?.all_listings?.data ?? []
  const totalClosed = closed?.pagination?.total ?? 0

  const allCategoriesListing: CategoryItem[] = categories ?? []
  // const totalCategories = categories?.pagination?.total ?? 0

  // const totalListingPages = Math.ceil(totalListings / perpage)
  const totalApprovalPages = Math.ceil(totalApprovals / perpage)
  // const totalClosedPages = Math.ceil(totalClosed / perpage)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ListingItem
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const [categorySortConfig, setCategorySortConfig] = useState<{
    key: keyof CategoryItem
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const handleSort = (key: keyof ListingItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortedListings = useSortedData(
    capitalizeKey(allOpenListing as ListingItem[], 'name'),
    sortConfig,
  )

  const sortedApprovals = useSortedData(
    capitalizeKey(allApprovalListing, 'name'),
    sortConfig,
  )

  const sortedClosed = useSortedData(
    capitalizeKey(allClosedListing, 'name'),
    sortConfig,
  )

  const sortedCategories = useSortedData(
    capitalizeKey(allCategoriesListing, 'name'),
    categorySortConfig,
  )

  useEffect(() => {
    const leftOffValue = localStorage.getItem('leftOff')
    if (leftOffValue) {
      setActiveTab(leftOffValue)
    } else {
      setActiveTab('open')
    }
  }, [])

  const handleView = (itemId: Id) => {
    navigate({
      to: `/marketPlace/${itemId}`,
      search: { type: activeTab as TypeProps, category: itemId },
    })
  }

  const handleAddCategory = async (categoryData: any) => {
    try {
      const formData = new FormData()
      formData.append('name', categoryData.name)

      await addCategory.mutateAsync(formData, {
        onSuccess: () => setOpenFormModal(false),
      })
      // setModalOpened(false);
    } catch (error) {
      // Error is already handled in the mutation
      console.error('Error adding category:', error)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-4">
          <TabHeader
            activeTab={activeTab}
            onChange={(value) => {
              localStorage.setItem('leftOff', value)
              setActiveTab(value)
            }}
            tabs={[
              { id: 'open', label: 'Open Listings' },
              { id: 'approval', label: 'Awaiting Approval' },
              { id: 'closed', label: 'Closed Transaction' },
              { id: 'categories', label: 'Categories' },
            ]}
          />
        </div>

        {activeTab === 'open' ? (
          canAccess('view_open_listings') ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
                <StatCard
                  title="Total Listings"
                  value={totalListings}
                  color="bg-icon-light-blue"
                  image={shop}
                />
                <StatCard
                  title="Listed Value"
                  value={formatNumber(listing?.totalListedValue)}
                  color="bg-green-100"
                  image={cardblack}
                />
                <StatCard
                  title="In-Escrow Value"
                  value={listing?.In_Escrow_Value}
                  color="bg-green-100"
                  image={cardblack}
                />
                <StatCard
                  title="In-Escrow"
                  value={listing?.In_Escrow_count}
                  color="bg-icon-light-pink"
                  image={convertShape}
                />
              </div>

              <ReusableTable<ListingItem>
                title="Product List"
                totalCount={totalListings}
                data={sortedListings}
                columns={listingColumns({
                  page,
                  // handleView,
                  handleView: (id) => handleView(id),
                  handleDeleteClick,
                  buttonLayout: 'menu', // Menu style
                  showActions: ['view', 'delete'],
                })}
                isLoading={listingIsloading}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {/* {!listingIsloading && totalListingPages > 1 && (
              <PaginationControls
                currentPage={page}
                totalPages={totalListingPages}
                onPageChange={setPage}
              />
            )} */}

              <ConfirmDeleteModal
                opened={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Transaction"
                message="Are you sure you want to delete this user? This action cannot be undone."
                loading={deleteProduct.isPending}
              />
            </>
          ) : (
            <NoAccess />
          )
        ) : (
          ''
        )}

        {activeTab === 'approval' ? (
          canAccess('view_awaiting_approval_listings') ? (
            <>
              <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mb-6">
                  <StatCard
                    title="Total Awaiting"
                    value={totalApprovals}
                    color="bg-icon-light-blue"
                    image={shop}
                  />
                  <StatCard
                    title="Awaiting Value"
                    value={`NGN ${formatNumber(approval?.awaiting_value)}`}
                    color="bg-green-100"
                    image={cardblack}
                  />
                </div>

                <ReusableTable<ListingItem>
                  title="Awaiting Approval"
                  totalCount={totalApprovals}
                  data={sortedApprovals}
                  columns={listingColumns({
                    page,
                    handleView: (id) => handleView(id),
                    handleApprove,
                    handleReject,
                    buttonLayout: 'horizontal',
                    showActions: ['approve', 'reject', 'view'],
                  })}
                  isLoading={approvalIsloading}
                  searchQuery={search}
                  onSearchChange={handleSearch}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />

                {!approvalIsloading && totalApprovalPages > 1 && (
                  <PaginationControls
                    currentPage={page}
                    totalPages={totalApprovalPages}
                    onPageChange={setPage}
                  />
                )}
              </div>
            </>
          ) : (
            <NoAccess />
          )
        ) : (
          ''
        )}

        {activeTab === 'closed' ? (
          canAccess('view_closed_transactions') ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
                <StatCard
                  title="Total Transaction"
                  value={0}
                  color="bg-icon-light-blue"
                  image={shop}
                />
                <StatCard
                  title="Transaction Value"
                  value={formatNumber(0)}
                  color="bg-green-100"
                  image={cardblack}
                />
                <StatCard
                  title="Deleted Listings"
                  value={0}
                  color="bg-green-100"
                  image={cardblack}
                />
              </div>

              <ReusableTable<ListingItem>
                title="Closed Transaction"
                totalCount={totalClosed}
                data={sortedClosed}
                columns={listingColumns({
                  page,
                  handleView: (id) => handleView(id),
                  handleDeleteClick,
                  buttonLayout: 'menu',
                  showActions: ['view', 'delete'],
                })}
                isLoading={closedIsloading}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              <ConfirmDeleteModal
                opened={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Transaction"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                // loading={deleteClosed.isPending}
              />
            </>
          ) : (
            <NoAccess />
          )
        ) : (
          ''
        )}

        {activeTab === 'categories' ? (
          canAccess('view_marketplace_categories') ? (
            <>
              <div className="">
                <ReusableTable<CategoryItem>
                  title="Categories"
                  // totalCount={totalCategories} // NOT available issues
                  totalCount={allCategoriesListing.length} // NOT available issues
                  data={sortedCategories}
                  columns={categoryColumns({
                    page,
                    handleView: (id) => handleView(id),
                    handleDeleteClick,
                  })}
                  isLoading={categoriesIsloading}
                  searchQuery={search}
                  onSearchChange={handleSearch}
                  sortConfig={categorySortConfig}
                  // onSort={handleSort}
                  onSort={(key) =>
                    setCategorySortConfig((prev) => ({
                      key,
                      direction:
                        prev.key === key && prev.direction === 'asc'
                          ? 'desc'
                          : 'asc',
                    }))
                  }
                  headerActions={
                    <BaseButton
                      title="Add New"
                      showPlusIcon={true}
                      modalTitle="Add Category"
                      fields={[{ name: 'name', label: 'Name', type: 'text' }]}
                      onClick={() => setOpenFormModal(true)}
                      onSubmit={handleAddCategory}
                      className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
                    />
                  }
                />
              </div>

              <ConfirmDeleteModal
                opened={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Categories"
                message="Are you sure you want to delete this user? This action cannot be undone."
                loading={deleteCategories.isPending}
              />
            </>
          ) : (
            <NoAccess />
          )
        ) : (
          ''
        )}
      </div>
    </DashboardLayout>
  )
}
