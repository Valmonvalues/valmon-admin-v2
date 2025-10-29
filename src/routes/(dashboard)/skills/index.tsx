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
    mutation: deleteTransaction,
    entityName: 'skills',
  })
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const [activeTab, setActiveTab] = useState('skill transactions')
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

  // const sortedTransaction = useSortedData(transaction, sortConfig)

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

  const handleView = (categoryId: Id) => {
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
                // totalCount={10}
                data={sortedTransaction}
                columns={transactionColumns({
                  handleView,
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
              totalCount={categoriesData.length}
              data={sortedCategories}
              columns={categoriesColumns({
                handleView,
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
                    // onSubmit={(data) => console.log('New Category:', data)}
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
            title="Delete User"
            message="Are you sure you want to delete this user? This action cannot be undone."
            loading={deleteParent.isPending}
          />
        </div>
      )}
    </DashboardLayout>
  )
}

// import { subCategoriesColumns } from '@/columns/subCategoriesColumns'
// import { ReusableTable } from '@/components/table/ReusableTable'
// import useSortedData from '@/hook/sortData'
// import DashboardLayout from '@/layout/DashboardLayout'
// import { useSkills } from '@/services/skills.service'
// import type { Id } from '@/types/global.type'
// import type { SubCategory } from '@/types/skills.types'
// import { createFileRoute, useNavigate } from '@tanstack/react-router'
// import { useEffect, useMemo, useState } from 'react'
// import { debounce } from 'lodash'
// import BaseButton from '@/components/BaseButton'
// import { useGlobalContext } from '@/contexts/GlobalContext'
// import StatCard from '@/components/StatCard'
// import { formatNumber } from '@/utils/formatters'
// import { BackButton } from '@/components/BackButton'

// export const Route = createFileRoute('/(dashboard)/skills/$categoryId')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   const navigate = useNavigate()

//   const { categoryId } = Route.useParams()
//   const { listParentSubCategory, addSubCategory, editSubCategory } = useSkills()
//   const { data: parentSubCategoryResponse, isLoading } =
//     listParentSubCategory(categoryId)
//   const parentSubCategory: SubCategory[] =
//     parentSubCategoryResponse?.all_sub_categories ?? []

//   // console.log(parentSubCategoryResponse)

//   const { setOpenFormModal } = useGlobalContext()
//   const [search, setSearch] = useState('')
//   const [debouncedSearch, setDebouncedSearch] = useState('')
//   // console.log(parentSubCategory)

//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof SubCategory
//     direction: 'asc' | 'desc'
//   }>({ key: 'name', direction: 'asc' })

//   const debouncedUpdate = useMemo(
//     () => debounce((value: string) => setDebouncedSearch(value), 400),
//     [],
//   )

//   useEffect(() => {
//     return () => debouncedUpdate.cancel()
//   }, [debouncedUpdate])

//   const handleSearch = (value: string) => {
//     setSearch(value)
//     debouncedUpdate(value)
//   }

//   const filteredParentCategory =
//     debouncedSearch.trim() === ''
//       ? parentSubCategory
//       : parentSubCategory.filter((category) =>
//           category.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
//         )

//   const sortedParentCategory = useSortedData(filteredParentCategory, sortConfig)

//   const handleSort = (key: keyof SubCategory) => {
//     setSortConfig((prev) => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
//     }))
//   }

//   const handleAddCategory = async (subCategoryData: any) => {
//     try {
//       await addSubCategory.mutateAsync(
//         { ...subCategoryData, service_category_id: categoryId },
//         {
//           onSuccess: () => setOpenFormModal(false),
//         },
//       )
//     } catch (error) {
//       console.error('Error adding category:', error)
//     }
//   }

//   const handleView = (categoryId: Id) => {
//     navigate({ to: `/skills/${categoryId}` })
//   }

//   // const handleView = (id: Id) => console.log('View', id)
//   //   const handleEdit = (id: Id) => console.log('Edit', id)
//   const handleEditSubCategory = (
//     id: Id,
//     updatedData: { name: string; description?: string },
//   ) => {
//     editSubCategory.mutate({ id, data: updatedData })
//   }
//   const handleDeleteClick = (id: Id) => console.log('Delete', id)

//   return (
//     <DashboardLayout>
//       <div className="py-5">
//         {categoryId}
//         <BackButton color="black" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
//         <StatCard
//           title="Total Transactions"
//           value={parentSubCategoryResponse?.total_tansactions}
//           color="bg-pink-100"
//           image={''}
//         />
//         <StatCard
//           title="Transaction Values"
//           value={formatNumber(parentSubCategoryResponse?.transaction_value)}
//           color="bg-purple-100"
//           image={''}
//         />
//         <StatCard
//           title="Valmon Earnings"
//           value={formatNumber(parentSubCategoryResponse?.valmon_earning)}
//           color="bg-dark-gold"
//           image={''}
//         />
//         <StatCard
//           title="Top Categories"
//           // value={formatNumber(skillsData?.valmon_earning)}
//           // color="bg-green-100"
//           // image={earningImage}
//         />
//       </div>
//       <div className="">
//         <ReusableTable
//           title="Sub Category List"
//           totalCount={parentSubCategory.length}
//           data={sortedParentCategory}
//           columns={subCategoriesColumns({
//             // page,
//             handleView,
//             handleEditSubCategory,
//             handleDeleteClick,
//           })}
//           isLoading={isLoading}
//           searchQuery={search}
//           onSearchChange={handleSearch}
//           sortConfig={sortConfig}
//           onSort={handleSort}
//           headerActions={
//             <div className="flex items-center gap-3">
//               <BaseButton
//                 title="Add New"
//                 showPlusIcon={true}
//                 modalTitle="Add Sub Category"
//                 fields={[
//                   { name: 'name', label: 'Name', type: 'text' },
//                   {
//                     name: 'description',
//                     label: 'Description',
//                     type: 'textarea',
//                   },
//                 ]}
//                 onClick={() => setOpenFormModal(true)}
//                 onSubmit={handleAddCategory}
//                 loading={addSubCategory.isPending}
//                 className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
//               />
//             </div>
//           }
//         />
//       </div>
//     </DashboardLayout>
//   )
// }
