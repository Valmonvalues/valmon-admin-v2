import { useState } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import { ReusableTable } from '@/components/table/ReusableTable'
import { useResolution } from '@/services/resolution.service'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Ticket } from '@/types/resolution.types'
import useSortedData from '@/hook/sortData'
import type { Id } from '@/types/global.type'
import { resolutionServicesColumns } from '@/columns/resolutionServicesColumns'
import { perPage as perpage } from '@/constant/config'
import TabHeader from '@/components/TabHeader'
import { SimpleGrid, Text } from '@mantine/core'
import StatCard from '@/components/StatCard'
import { formatNumber } from '@/utils/formatters'
import { routeGaurd } from '@/middleware/routeGuard'
import { capitalizeKey } from '@/utils/helper'
import { resolutionMarketplaceColumns } from '@/columns/resolutionMarketPlaceColumns'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'
import { PaginationControls } from '@/components/table/PaginationControls'
import { useAccessManagement } from '@/hook/useAccessManagement'
import NoAccess from '@/components/NoAccess'

export const Route = createFileRoute('/(dashboard)/resolution/')({
  component: Resolution,
  loader: () =>
    routeGaurd([
      'view_service_conflicts',
      'manage_service_conflicts',
      'view_marketplace_conflicts',
      'manage_marketplace_conflicts',
    ]),
})

function Resolution() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('services')
  const { canAccess } = useAccessManagement()

  const [page, setPage] = useState(1)
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const { listingServices, listingMarketPlace } = useResolution()
  const { data: serviceData, isLoading: servicesLoading } = listingServices()
  const { data: marketplaceData, isLoading: marketPlaceLoading } =
    listingMarketPlace({ page, perpage, search: debouncedSearch || undefined })
  const marketplace = marketplaceData?.tickets || []
  const totalMarketPlace = marketplaceData?.pagination?.total_items ?? 0
  const totalMarketPlacePages = Math.ceil(totalMarketPlace / perpage)
  // const totalMarketPlacePages = marketplaceData?.pagination?.total_pages ?? 0

  const services = serviceData?.tickets || []
  // const ticketCountServices = serviceData?.summary?.ticketCount
  const totalValueServices = serviceData?.summary?.ticketsAmount
  const resolvedTicketCountServices = serviceData?.summary?.resolvedTicketCount
  const resolvedTicketValueServices = serviceData?.summary?.resolvedTicketValue

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ticket
    direction: 'asc' | 'desc'
  }>({ key: 'employer', direction: 'asc' })

  const sortedTServices = useSortedData(
    capitalizeKey(services, 'employer'),
    sortConfig,
  )

  const sortedMarketplace = useSortedData(
    capitalizeKey(marketplace, 'buyer'),
    sortConfig,
  )

  const handleSort = (key: keyof Ticket) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleView = (id: Id) => {
    navigate({ to: `/resolution/${id}` })
    console.log(id)
  }

  return (
    <DashboardLayout>
      <div className="mb-4">
        <TabHeader
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'services', label: 'Services' },
            { id: 'market-place', label: 'Market Place' },
          ]}
        />
      </div>

      {activeTab === 'services' ? (
        canAccess('view_service_conflicts') ? (
          <>
            <SimpleGrid cols={4} spacing="lg" className="mb-6 max-w-[1000px]">
              <StatCard
                title="All Reports"
                value={services.length}
                // value={ticketCountServices}
                color="bg-pink-100"
                image={''}
              />
              <StatCard
                title="Resolved Reports"
                value={formatNumber(resolvedTicketCountServices)}
                color="bg-purple-100"
                image={''}
              />
              <StatCard
                title="Total Value"
                value={formatNumber(totalValueServices)}
                color="bg-dark-gold"
                image={''}
              />
              <StatCard
                title="Resolved Value"
                value={formatNumber(resolvedTicketValueServices)}
                color="bg-green-100"
                image={''}
              />
            </SimpleGrid>

            <div className="">
              <ReusableTable
                title="Report"
                totalCount={services.length}
                data={sortedTServices}
                columns={resolutionServicesColumns({
                  page,
                  handleView,
                  // handleDeleteClick,
                })}
                isLoading={servicesLoading}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {!canAccess('manage_service_conflicts') && (
                <Text size="xs" c="dimmed" mt="sm">
                  You have view-only access to conflict resolution.
                </Text>
              )}
            </div>
          </>
        ) : (
          <NoAccess />
        )
      ) : (
        ''
      )}

      {activeTab === 'market-place' ? (
        canAccess('view_marketplace_conflicts') ? (
          <>
            <SimpleGrid cols={4} spacing="lg" className="mb-6 max-w-[1000px]">
              <StatCard
                title="All Reports"
                value={marketplace.length}
                color="bg-pink-100"
                image={''}
              />
              <StatCard
                title="Resolved Reports"
                value={formatNumber(0)}
                color="bg-purple-100"
                image={''}
              />
              <StatCard
                title="Total Value"
                value={formatNumber(0)}
                color="bg-dark-gold"
                image={''}
              />
              <StatCard title="Resolved Value" />
            </SimpleGrid>

            <div className="">
              <ReusableTable
                title="Report"
                totalCount={marketplace.length}
                data={sortedMarketplace}
                columns={resolutionMarketplaceColumns({
                  page,
                  handleView,
                  // handleDeleteClick,
                })}
                isLoading={marketPlaceLoading}
                searchQuery={search}
                onSearchChange={handleSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {!marketPlaceLoading && totalMarketPlacePages > 1 && (
                <PaginationControls
                  currentPage={page}
                  totalPages={totalMarketPlacePages}
                  onPageChange={setPage}
                />
              )}

              {!canAccess('manage_marketplace_conflicts') && (
                <Text size="xs" c="dimmed" mt="sm">
                  You have view-only access to conflict resolution.
                </Text>
              )}
            </div>
          </>
        ) : (
          <NoAccess />
        )
      ) : (
        ''
      )}
    </DashboardLayout>
  )
}
