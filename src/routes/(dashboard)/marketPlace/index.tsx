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

export const Route = createFileRoute('/(dashboard)/marketPlace/')({
  component: MarketPlace,
})

function MarketPlace() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('open')
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const [page] = useState(1)
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
        console.log('categories')
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

  const { handleApprove, handleReject } = useHandleApproveDeny()
  const { setOpenFormModal } = useGlobalContext()

  const { data: listing, isLoading: listingIsloading } = listingSummary({
    page,
    perpage,
  })

  const { data: approval, isLoading: approvalIsloading } = listingApproval({
    page,
    perpage,
  })

  const { data: closed, isLoading: closedIsloading } = listingClosed({
    page,
    perpage,
  })

  const { data: categories, isLoading: categoriesIsloading } =
    listingCategories({
      page,
      perpage,
    })

  const allOpenListing = listing?.all_listings ?? []
  // const totalListings = listing?.pagination?.total ?? 0
  const totalListings = listing?.totalListingCount ?? 0

  const allApprovalListing = approval?.all_listings ?? []
  // const totalApprovals = approval?.pagination?.total ?? 0
  const totalApprovals = approval?.total_awaiting ?? 0

  const allCLosedListing = closed?.all_listings ?? []
  const totalClosed = closed?.pagination?.total ?? 0

  const allCategoriesListing: CategoryItem[] = categories ?? []
  // const totalCategories = categories?.pagination?.total ?? 0

  // const totalPages = Math.ceil(totalListings / perpage)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ListingItem
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const [categorySortConfig, setCategorySortConfig] = useState<{
    key: keyof CategoryItem
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })
  //   const totalUsers = listing?.pagination?.total ?? 0
  //   const totalPages = Math.ceil(totalUsers / perpage)

  const handleSort = (key: keyof ListingItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const filteredOpenListings =
    debouncedSearch.trim() === ''
      ? allOpenListing
      : allOpenListing.filter((aol) =>
          aol.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
  const sortedListings = useSortedData(filteredOpenListings, sortConfig)

  const filteredApprovalListings =
    debouncedSearch.trim() === ''
      ? allApprovalListing
      : allApprovalListing.filter((apl) =>
          apl.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
  const sortedApprovals = useSortedData(filteredApprovalListings, sortConfig)

  const filteredCLosedListings =
    debouncedSearch.trim() === ''
      ? allCLosedListing
      : allCLosedListing.filter((acl) =>
          acl.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
  const sortedClosed = useSortedData(filteredCLosedListings, sortConfig)

  const filteredCategoriesListings =
    debouncedSearch.trim() === ''
      ? allCategoriesListing
      : allCategoriesListing.filter((acll) =>
          acll.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
  const sortedCategories = useSortedData(
    filteredCategoriesListings,
    categorySortConfig,
  )

  useEffect(() => {
    const leftOffValue = localStorage.getItem('leftOff')
    console.log(leftOffValue)
    if (leftOffValue) {
      setActiveTab(leftOffValue)
    } else {
      setActiveTab('open')
    }
  }, [])

  const handleView = (itemId: Id, type: string) => {
    localStorage.setItem('leftOff', type)
    navigate({ to: `/marketPlace/${itemId}` })
  }

  const handleAddCategory = async (categoryData: any) => {
    try {
      const formData = new FormData()
      formData.append('name', categoryData.name)

      console.log('category: ', categoryData)

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
            onChange={setActiveTab}
            tabs={[
              { id: 'open', label: 'Open Listings' },
              { id: 'approval', label: 'Awaiting Approval' },
              { id: 'closed', label: 'Closed Transaction' },
              { id: 'categories', label: 'Categories' },
            ]}
          />
        </div>

        {activeTab === 'open' && (
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
                handleView: (id) => handleView(id, 'open'),
                handleDeleteClick,
                buttonLayout: 'menu', // Menu style
                // showActions: ['view', 'edit', 'delete'],
                showActions: ['view', 'delete'],
              })}
              isLoading={listingIsloading}
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
              message="Are you sure you want to delete this user? This action cannot be undone."
              loading={deleteProduct.isPending}
            />
          </>
        )}
        {activeTab === 'approval' && (
          <>
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
                handleView: (id) => handleView(id, 'approval'),
                handleApprove, // Make sure to define this function
                handleReject, // Make sure to define this function
                buttonLayout: 'horizontal', // Horizontal buttons
                showActions: ['approve', 'reject', 'view'],
              })}
              isLoading={approvalIsloading}
              searchQuery={search}
              onSearchChange={handleSearch}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </>
        )}
        {activeTab === 'closed' && (
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
              <StatCard
                title=""
                value={0}
                color="bg-icon-light-pink"
                image={convertShape}
              />
            </div>

            <ReusableTable<ListingItem>
              title="Closed Transaction"
              totalCount={totalClosed}
              data={sortedClosed}
              columns={listingColumns({
                page,
                handleView: (id) => handleView(id, 'closed'),
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
        )}
        {activeTab === 'categories' && (
          <>
            <div className="">
              <ReusableTable<CategoryItem>
                title="Categories"
                // totalCount={totalCategories} // NOT available issues
                totalCount={allCategoriesListing.length} // NOT available issues
                data={sortedCategories}
                columns={categoryColumns({
                  page,
                  // handleView,
                  handleView: (id) => handleView(id, 'categories'),
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
        )}
      </div>
    </DashboardLayout>
  )
}
