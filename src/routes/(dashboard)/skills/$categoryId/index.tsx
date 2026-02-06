import { subCategoriesColumns } from '@/columns/subCategoriesColumns'
import { BackButton } from '@/components/BackButton'
import BaseButton from '@/components/BaseButton'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import StatCard from '@/components/StatCard'
import { ReusableTable } from '@/components/table/ReusableTable'
import TopCategoriesStat from '@/components/TopCategoriesStat'
import { capitalizeKey } from '@/components/utils/helper'
import { routeGaurd } from '@/components/utils/routeGuard'
import { useGlobalContext } from '@/contexts/GlobalContext'
import { allowedRoles } from '@/data/roles'
import useSortedData from '@/hook/sortData'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import { useHandleDelete } from '@/hook/useHandleDelete'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSkills } from '@/services/skills.service'
import type { Id } from '@/types/global.type'
import type { SubCategory } from '@/types/skills.types'
import { formatNumber } from '@/utils/formatters'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(dashboard)/skills/$categoryId/')({
  component: RouteComponent,
  loader: () => routeGaurd(allowedRoles.skills),
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  const navigate = useNavigate()
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()

  const {
    listParentSubCategory,
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
  } = useSkills()
  const { data: parentSubCategoryResponse, isLoading } =
    listParentSubCategory(categoryId)
  const parentSubCategory: SubCategory[] =
    parentSubCategoryResponse?.all_sub_categories ?? []

  const TopSubCategory = parentSubCategoryResponse?.top_sub_categories ?? []

  // console.log(parentSubCategoryResponse)

  const {
    modalOpen: deleteModalOpen,
    setModalOpen: setDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHandleDelete({
    mutation: deleteSubCategory,
    entityName: 'sub-categories',
  })
  const { initialData, setInitialData, setOpenFormModal } = useGlobalContext()

  const [sortConfig, setSortConfig] = useState<{
    key: keyof SubCategory
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const filteredParentCategory =
    debouncedSearch.trim() === ''
      ? parentSubCategory
      : parentSubCategory.filter((category) =>
          category.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedParentCategory = useSortedData(
    capitalizeKey(filteredParentCategory, 'name'),
    sortConfig,
  )

  const handleSort = (key: keyof SubCategory) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleAddCategory = async (subCategoryData: any) => {
    try {
      if (initialData) {
        await editSubCategory.mutateAsync(
          {
            id: initialData.id,
            data: subCategoryData,
          },
          {
            onSuccess: () => {
              setInitialData(null)
              setOpenFormModal(false)
            },
          },
        )
      } else {
        await addSubCategory.mutateAsync(
          { ...subCategoryData, service_category_id: categoryId },
          {
            onSuccess: () => setOpenFormModal(false),
          },
        )
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleView = (subCategoryId: Id) => {
    navigate({ to: `/skills/${categoryId}/${subCategoryId}` })
  }

  const handleEditSubCategory = (data: SubCategory) => {
    setOpenFormModal(true)
    setInitialData(data)
  }

  return (
    <DashboardLayout>
      <div className="py-5">
        <BackButton color="black" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mb-6">
        <StatCard
          title="Total Transactions"
          value={parentSubCategoryResponse?.total_tansactions}
          color="bg-pink-100"
          image={''}
        />
        <StatCard
          title="Transaction Values"
          value={formatNumber(parentSubCategoryResponse?.transaction_value)}
          color="bg-purple-100"
          image={''}
        />
        <StatCard
          title="Valmon Earnings"
          value={formatNumber(parentSubCategoryResponse?.valmon_earning)}
          color="bg-dark-gold"
          image={''}
        />
        {/* <StatCard
          title="Top Categories"
          // value={formatNumber(skillsData?.valmon_earning)}
          // color="bg-green-100"
          // image={earningImage}
        /> */}
        <StatCard title="Top Categories" showImage={false} image={''}>
          <TopCategoriesStat categories={TopSubCategory} />
        </StatCard>
      </div>
      <div className="">
        <ReusableTable
          title="Sub Category List"
          totalCount={parentSubCategory.length}
          data={sortedParentCategory}
          columns={subCategoriesColumns({
            // page,
            handleView,
            handleEditSubCategory,
            handleDeleteClick,
          })}
          isLoading={isLoading}
          searchQuery={search}
          onSearchChange={handleSearch}
          sortConfig={sortConfig}
          onSort={handleSort}
          headerActions={
            <div className="flex items-center gap-3">
              <BaseButton
                title="Add New"
                showPlusIcon={true}
                modalTitle="Add Sub Category"
                fields={[
                  { name: 'name', label: 'Name', type: 'text' },
                  {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                  },
                ]}
                onClick={() => setOpenFormModal(true)}
                onSubmit={handleAddCategory}
                loading={addSubCategory.isPending || editSubCategory.isPending}
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
        title="Delete Transaction"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={deleteSubCategory.isPending}
      />
    </DashboardLayout>
  )
}
