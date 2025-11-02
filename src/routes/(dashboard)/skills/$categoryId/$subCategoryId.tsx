import { customersColumns } from '@/columns/customersColumns'
import { BackButton } from '@/components/BackButton'
import { ReusableTable } from '@/components/table/ReusableTable'
import useSortedData from '@/hook/sortData'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSkills } from '@/services/skills.service'
import type { Customers } from '@/types/skills.types'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute(
  '/(dashboard)/skills/$categoryId/$subCategoryId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { subCategoryId } = Route.useParams()
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const { listCustomers } = useSkills()
  const { data: customersResponse, isLoading: customersIsLoading } =
    listCustomers(subCategoryId)
  const customersData: Customers[] = customersResponse ?? []
  console.log(customersResponse, customersData)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Customers
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const filteredCustomers =
    debouncedSearch.trim() === ''
      ? customersData
      : customersData.filter((customer: any) =>
          customer.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedCustomers = useSortedData(filteredCustomers, sortConfig)

  const handleSort = (key: keyof Customers) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <DashboardLayout>
      <div className="py-5">
        <BackButton color="black" />
      </div>

      <div className="">
        <ReusableTable
          title="Customers"
          totalCount={customersData.length}
          data={sortedCustomers}
          columns={customersColumns()}
          isLoading={customersIsLoading}
          searchQuery={search}
          onSearchChange={handleSearch}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </DashboardLayout>
  )
}
