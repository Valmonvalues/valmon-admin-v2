import { useState } from 'react'
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
import { SimpleGrid } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

import { formatNumber } from '@/utils/formatters'

import profile from '@/assets/icons/cardprofile.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'
import cardwhite from '@/assets/icons/card-pos.svg'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { useHandleDelete } from '@/hook/useHandleDelete'

export const Route = createFileRoute('/(dashboard)/skills/')({
  component: Skills,
})

function Skills() {
  // const navigate = useNavigate()
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
    mutation: deleteTransaction,
    entityName: 'skills',
  })
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('skill transactions')

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

  const sortedTransaction = useSortedData(transaction, sortConfig)

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

  const handleView = (transactionId: Id) => {
    // navigate({ to: `/users/${transactionId}` })
    console.log(transactionId)
  }

  const handleAddCategory = async (categoryData: any) => {
    try {
      await addCategory.mutateAsync(categoryData)
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
          <SimpleGrid cols={4} spacing="lg" className="mb-6 max-w-[1000px]">
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
          </SimpleGrid>

          <div className="">
            <div className="">
              <ReusableTable
                title="Transactions"
                totalCount={transaction.length}
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
              totalCount={categoriesData.length}
              data={categories}
              columns={categoriesColumns({
                handleView,
                handleDeleteClick,
              })}
              isLoading={skillDataLoader}
              searchQuery={search}
              onSearchChange={setSearch}
              sortConfig={sortConfigParent}
              onSort={handleSortParent}
              headerActions={
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
                    { name: 'image', label: 'Pick a file', type: 'file' },
                  ]}
                  // onSubmit={(data) => console.log("New Category:", data)}
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
            title="Delete User"
            message="Are you sure you want to delete this user? This action cannot be undone."
            loading={deleteParent.isPending}
          />
        </div>
      )}
    </DashboardLayout>
  )
}
