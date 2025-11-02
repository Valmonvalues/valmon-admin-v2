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

import { formatNumber } from '@/utils/formatters'

import profile from '@/assets/icons/cardprofile.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'
import cardwhite from '@/assets/icons/card-pos.svg'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { useHandleDelete } from '@/hook/useHandleDelete'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import { useGlobalContext } from '@/contexts/GlobalContext'

export const Route = createFileRoute('/(dashboard)/skills/')({
  component: Skills,
})

function Skills() {
  const [activeTab, setActiveTab] = useState('skill transactions')
  const navigate = useNavigate()
  const {
    listSkills,
    listCategories,
    addCategory,
    deleteTransaction,
    deleteParent,
  } = useSkills()
  const {
    // selectedId: selectedManager,
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

  const { data: skillsData, isLoading: skillDataLoader } = listSkills()
  const { data: categoriesData } = listCategories()
  const transaction = skillsData?.all_transactions || []
  const categories = categoriesData || []

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

  const filteredTransactions =
    debouncedSearch.trim() === ''
      ? transaction
      : transaction.filter((t) =>
          t.employer_name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedTransaction = useSortedData(filteredTransactions, sortConfig)

  const filteredCategories =
    debouncedSearch.trim() === ''
      ? categories
      : categories.filter((c: any) =>
          c.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedCategories = useSortedData(filteredCategories, sortConfigParent)

  useEffect(() => {
    const leftOffValue = localStorage.getItem('leftOffSkill')
    if (leftOffValue) {
      setActiveTab(leftOffValue)
    } else {
      setActiveTab('skill transactions')
    }
  }, [])

  const handleView = (categoryId: Id, type: string) => {
    localStorage.setItem('leftOffSkill', type)
    navigate({ to: `/skills/${categoryId}` })
  }

  const handleAddCategory = async (categoryData: any) => {
    try {
      const formData = new FormData()
      formData.append('name', categoryData.name)
      formData.append('description', categoryData.description)
      // formData.append('email', categoryData.email)

      console.log('category: ', categoryData)

      if (categoryData.image instanceof File) {
        formData.append('category_image', categoryData.image)
        console.log(categoryData.image)
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

  return (
    <DashboardLayout>
      <div className="mb-4">
        <TabHeader
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'skill transactions', label: 'Skill Transactions' },
            { id: 'skill parent', label: 'Skill Parent Category' },
          ]}
        />
      </div>

      {activeTab === 'skill transactions' && (
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
            <StatCard
              title="Top Categories"
              // value={formatNumber(skillsData?.valmon_earning)}
              // color="bg-green-100"
              // image={earningImage}
            />
          </div>

          <div className="">
            <div className="">
              <ReusableTable
                title="Transactions"
                totalCount={transaction.length}
                data={sortedTransaction}
                columns={transactionColumns({
                  // handleView,
                  handleView: (id) => handleView(id, 'skill transactions'),
                  handleDeleteClick,
                })}
                isLoading={skillDataLoader}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
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
      )}

      {activeTab === 'skill parent' && (
        <div className="">
          <div className="">
            <ReusableTable
              title="Parent Category List"
              totalCount={categoriesData?.length}
              data={sortedCategories}
              columns={categoriesColumns({
                // handleView,
                handleView: (id) => handleView(id, 'skill parent'),
                handleDeleteClick,
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
                    onClick={() => setOpenFormModal(true)}
                    onSubmit={handleAddCategory}
                    loading={addCategory.isPending}
                    className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
                  />
                </div>
              }
            />
          </div>

          <ConfirmDeleteModal
            opened={deleteModalOpen}
            onCancel={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Category"
            message="Are you sure you want to delete this category? This action cannot be undone."
            loading={deleteParent.isPending}
          />
        </div>
      )}
    </DashboardLayout>
  )
}
