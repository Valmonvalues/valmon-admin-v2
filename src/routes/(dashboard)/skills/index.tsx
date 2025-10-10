import { categoriesColumns } from '@/columns/categoriesColumns'
import { transactionColumns } from '@/columns/transactionColumns'
import { userColumns } from '@/columns/userColumns'
import BaseButton from '@/components/BaseButton'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import StatCard from '@/components/StatCard'
import TabHeader from '@/components/TabHeader'
import { PaginationControls } from '@/components/table/PaginationControls'
import { ReusableTable } from '@/components/table/ReusableTable'
import useSortedData from '@/hook/sortData'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSkills } from '@/services/skills.service'
import type { Id } from '@/types/global.type'
import type { Transaction } from '@/types/skills.types'
import { SimpleGrid } from '@mantine/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { formatNumber } from '@/utils/formatters'

import { useState } from 'react'

export const Route = createFileRoute('/(dashboard)/skills/')({
  component: Skills,
})

function Skills() {
  const navigate = useNavigate()
  const { listSkills, listCategories } = useSkills()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('skill transactions')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [selectedTransaction, setSelectedTransaction] = useState<null | Id>(
    null,
  )

  const { data: skillsData, isLoading: skillDataLoader } = listSkills()
  const { data: categoriesData, isLoading: categoriesDataLoader } =
    listCategories()
  const transaction = skillsData?.all_transactions || []
  const categories = categoriesData || []

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction
    direction: 'asc' | 'desc'
  }>({ key: 'employer_name', direction: 'asc' })

  const sortedTransaction = useSortedData(transaction, sortConfig)
  // console.log(categoriesData)

  const handleSort = (key: keyof Transaction) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleView = (transactionId: Id) => {
    // navigate({ to: `/users/${transactionId}` })
  }

  const handleDeleteClick = (transactionId: Id) => {
    // selectedTransaction(transactionId)
    setDeleteModalOpen(true)
  }

  // const handleConfirmDelete = () => {
  //   deleteUser.mutate(selectedUser as Id, {
  //     onSuccess: () => {
  //       setSelectedUser(null)
  //       setDeleteModalOpen(false)
  //     },
  //     onError: (error) => {
  //       console.error('Error deleting user:', error)
  //       notifications.show({
  //         title: 'Error',
  //         message: 'Failed to delete user. Please try again.',
  //         color: 'red',
  //       })
  //     },
  //   })
  // }

  return (
    <DashboardLayout>
      <div className="mb-4">
        {/* <TabHeader activeTab={activeTab} onChange={setActiveTab} /> */}
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
          <SimpleGrid cols={3} spacing="lg" className="mb-6 max-w-[900px]">
            <StatCard
              title="All Users"
              value={transaction.length}
              color="bg-pink-100"
            />
            <StatCard
              title="Service Providers"
              value={formatNumber(skillsData?.transaction_value)}
              color="bg-purple-100"
            />
            <StatCard
              title="Normal Users"
              value={formatNumber(skillsData?.valmon_earning)}
              color="bg-green-100"
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

            {/* <ConfirmDeleteModal
          opened={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          loading={deleteUser.isPending}
        /> */}
          </div>
        </>
      )}

      {activeTab === 'skill parent' && (
        // <div className="text-center text-gray-500 mt-10">
        //   Skill Parent Category content coming soon...
        // </div>
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
              sortConfig={sortConfig}
              onSort={handleSort}
              headerActions={
                <BaseButton
                  title="Add New"
                  showPlusIcon={true}
                  className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 shadow-none border-0"
                />
              }
            />
          </div>

          {/* <ConfirmDeleteModal
          opened={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          loading={deleteUser.isPending}
        /> */}
        </div>
      )}
    </DashboardLayout>
  )
}
