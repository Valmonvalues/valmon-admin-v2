import { subCategoriesColumns } from '@/columns/subCategoriesColumns'
import { BackButton } from '@/components/BackButton'
import BaseButton from '@/components/BaseButton'
import StatCard from '@/components/StatCard'
import { ReusableTable } from '@/components/table/ReusableTable'
import { useGlobalContext } from '@/contexts/GlobalContext'
import useSortedData from '@/hook/sortData'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSkills } from '@/services/skills.service'
import type { Id } from '@/types/global.type'
import type { SubCategory } from '@/types/skills.types'
import { formatNumber } from '@/utils/formatters'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(dashboard)/skills/$categoryId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  const navigate = useNavigate()
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()

  const { listParentSubCategory, addSubCategory, editSubCategory } = useSkills()
  const { data: parentSubCategoryResponse, isLoading } =
    listParentSubCategory(categoryId)
  const parentSubCategory: SubCategory[] =
    parentSubCategoryResponse?.all_sub_categories ?? []

  const { setOpenFormModal } = useGlobalContext()

  //   const [search, setSearch] = useState('')
  //   const [debouncedSearch, setDebouncedSearch] = useState('')

  const [sortConfig, setSortConfig] = useState<{
    key: keyof SubCategory
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

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

  const filteredParentCategory =
    debouncedSearch.trim() === ''
      ? parentSubCategory
      : parentSubCategory.filter((category) =>
          category.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedParentCategory = useSortedData(filteredParentCategory, sortConfig)

  const handleSort = (key: keyof SubCategory) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleAddCategory = async (subCategoryData: any) => {
    try {
      await addSubCategory.mutateAsync(
        { ...subCategoryData, service_category_id: categoryId },
        {
          onSuccess: () => setOpenFormModal(false),
        },
      )
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleView = (subCategoryId: Id) => {
    navigate({ to: `/skills/${categoryId}/${subCategoryId}` })
  }
  const handleEditSubCategory = (
    id: Id,
    updatedData: { name: string; description?: string },
  ) => {
    editSubCategory.mutate({ id, data: updatedData })
  }
  const handleDeleteClick = (id: Id) => console.log('Delete', id)

  console.log(categoryId)

  return (
    <DashboardLayout>
      <div className="py-5">
        {categoryId}
        <BackButton color="black" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
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
        <StatCard
          title="Top Categories"
          // value={formatNumber(skillsData?.valmon_earning)}
          // color="bg-green-100"
          // image={earningImage}
        />
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
                loading={addSubCategory.isPending}
                className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
              />
            </div>
          }
        />
      </div>
    </DashboardLayout>
  )
}
