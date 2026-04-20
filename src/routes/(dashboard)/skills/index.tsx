import { useEffect, useState } from 'react'
import { categoriesColumns } from '@/columns/categoriesColumns'
import { transactionColumns } from '@/columns/transactionColumns'
import BaseButton from '@/components/BaseButton'
import StatCard from '@/components/StatCard'
import TabHeader from '@/components/TabHeader'
import { ReusableTable } from '@/components/table/ReusableTable'
import useSortedData from '@/hook/sortData'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSkills } from '@/services/skills.service'
import type { Id } from '@/types/global.type'
import type { Transaction, CategoriesResponse } from '@/types/skills.types'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { perPage as perpage } from '@/constant/config'

import { formatNumber } from '@/utils/formatters'

import profile from '@/assets/icons/cardprofile.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'
import cardwhite from '@/assets/icons/card-pos.svg'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { useHandleDelete } from '@/hook/useHandleDelete'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import { useGlobalContext } from '@/contexts/GlobalContext'
import { routeGaurd } from '@/middleware/routeGuard'
import { accessBlocker, capitalizeKey } from '@/utils/helper'
import TopCategoriesStat from '@/components/TopCategoriesStat'
import { PaginationControls } from '@/components/table/PaginationControls'
import { useSummary } from '@/services/summary.service'
import { useAccessManagement } from '@/hook/useAccessManagement'
import NoAccess from '@/components/NoAccess'
import { Text } from '@mantine/core'

export const Route = createFileRoute('/(dashboard)/skills/')({
  component: Skills,
  loader: () =>
    routeGaurd(['view_skill_transactions', 'manage_skill_transactions']),
})

function Skills() {
  const [activeTab, setActiveTab] = useState('skill transactions')
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const {
    listSkills,
    listCategories,
    addCategory,
    deleteTransaction,
    deleteParent,
  } = useSkills()
  const { getSummary } = useSummary()
  const { data: summaryData } = getSummary()

  const {
    modalOpen: deleteModalOpen,
    setModalOpen: setDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHandleDelete({
    mutation:
      activeTab === 'skill transactions' ? deleteTransaction : deleteParent,
    entityName: 'skills',
  })
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const { setOpenFormModal } = useGlobalContext()
  const { canAccess } = useAccessManagement()
  const { data: skillsData, isLoading: skillDataLoader } = listSkills({
    page,
    perpage,
    search: debouncedSearch || undefined,
  })
  const { data: categoriesData } = listCategories({
    page,
    perpage,
    search: debouncedSearch || undefined,
  })
  // const transaction = skillsData?.all_transactions || []
  const transaction = skillsData?.data || []
  // const topCategories = skillsData?.top_categories || []
  const topCategories = summaryData?.top_skill_categories || []
  const categories = categoriesData || []

  const totalTransactions = skillsData?.total ?? 0
  const totalPages = Math.ceil(totalTransactions / perpage)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction
    direction: 'asc' | 'desc'
  }>({ key: 'employer_name', direction: 'asc' })

  const [sortConfigParent, setSortConfigParent] = useState<{
    key: keyof CategoriesResponse
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const handleSort = (key: keyof Transaction) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleSortParent = (key: keyof CategoriesResponse) => {
    setSortConfigParent((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortedTransaction = useSortedData(
    capitalizeKey(transaction, 'employer_name'),
    sortConfig,
  )

  const sortedCategories = useSortedData(
    capitalizeKey(categories, 'name'),
    sortConfigParent,
  )

  useEffect(() => {
    const leftOffValue = localStorage.getItem('leftOffSkill')
    if (leftOffValue) {
      setActiveTab(leftOffValue)
    } else {
      setActiveTab('skill transactions')
    }
  }, [])

  const handleView = (categoryId: Id) => {
    navigate({ to: `/skills/${categoryId}` })
  }

  const handleAddCategory = async (categoryData: any) => {
    try {
      const formData = new FormData()
      formData.append('name', categoryData.name)
      formData.append('description', categoryData.description)
      // formData.append('email', categoryData.email)

      if (categoryData.image instanceof File) {
        formData.append('category_image', categoryData.image)
      }

      await addCategory.mutateAsync(formData, {
        onSuccess: () => setOpenFormModal(false),
      })
      // setModalOpened(false);
    } catch (error) {
      // Error is already handled in the mutation
      console.error('Error adding category:', error)
    }
  }

  const handleOpenAddCat = () => {
    // Check access before proceeding
    const hasAccess = accessBlocker(canAccess, 'manage_skill_parent_categories')

    // If access is granted, open the modal
    if (hasAccess) {
      setOpenFormModal(true)
    }
  }

  const handleOpenDeleteClick = (id: Id) => {
    const hasAccess = accessBlocker(canAccess, 'manage_skill_parent_categories')

    if (hasAccess) {
      handleDeleteClick(id)
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-4">
        <TabHeader
          activeTab={activeTab}
          onChange={(value) => {
            localStorage.setItem('leftOffSkill', value)
            setActiveTab(value)
          }}
          tabs={[
            { id: 'skill transactions', label: 'Skill Transactions' },
            { id: 'skill parent', label: 'Skill Parent Category' },
          ]}
        />
      </div>

      {activeTab === 'skill transactions' ? (
        canAccess('view_skill_transactions') ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
              <StatCard
                title="Total Transaction"
                value={transaction.length}
                color="bg-pink-100"
                image={profile}
              />
              <StatCard
                title="Transaction Value"
                value={formatNumber(skillsData?.transaction_value)}
                color="bg-purple-100"
                image={cardblack}
              />
              <StatCard
                title="Valmon Earnings"
                value={formatNumber(skillsData?.valmon_earning)}
                color="bg-dark-gold"
                image={cardwhite}
              />

              <StatCard title="Top Categories">
                <TopCategoriesStat categories={topCategories} />
              </StatCard>
            </div>

            <div className="">
              <div className="">
                <ReusableTable
                  title="Transactions"
                  totalCount={transaction.length}
                  data={sortedTransaction}
                  columns={transactionColumns({ page })}
                  isLoading={skillDataLoader}
                  searchQuery={search}
                  onSearchChange={handleSearch}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />

                {!skillDataLoader && totalPages > 1 && (
                  <PaginationControls
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </div>

              <ConfirmDeleteModal
                opened={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Transaction"
                message="Are you sure you want to delete this user? This action cannot be undone."
                loading={deleteTransaction.isPending}
              />
            </div>
          </>
        ) : (
          <NoAccess />
        )
      ) : (
        ''
      )}

      {activeTab === 'skill parent' ? (
        canAccess('view_skill_parent_categories') ? (
          <div className="">
            <div className="">
              <ReusableTable
                title="Parent Category List"
                totalCount={categoriesData?.length}
                data={sortedCategories as any}
                columns={categoriesColumns({
                  handleView,
                  handleDeleteClick: handleOpenDeleteClick,
                })}
                isLoading={skillDataLoader}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfigParent}
                onSort={handleSortParent}
                headerActions={
                  <div className="flex items-center gap-3">
                    <BaseButton
                      title="Add New"
                      showPlusIcon={true}
                      modalTitle="Add Parent Category"
                      fields={[
                        { name: 'name', label: 'Name', type: 'text' },
                        {
                          name: 'description',
                          label: 'Description',
                          type: 'textarea',
                        },
                        {
                          name: 'image',
                          label: 'Pick a file',
                          type: 'file',
                          variant: 'image-upload',
                        },
                      ]}
                      onClick={handleOpenAddCat}
                      onSubmit={handleAddCategory}
                      loading={addCategory.isPending}
                      className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
                    />
                  </div>
                }
              />
            </div>

            {!canAccess('manage_skill_parent_categories') && (
              <Text size="xs" c="dimmed" mt="sm">
                You have view-only access to skill parent category.
              </Text>
            )}

            <ConfirmDeleteModal
              opened={deleteModalOpen}
              onCancel={() => setDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              title="Delete Category"
              message="Are you sure you want to delete this category? This action cannot be undone."
              loading={deleteParent.isPending}
            />
          </div>
        ) : (
          <NoAccess />
        )
      ) : (
        ''
      )}
    </DashboardLayout>
  )
}
