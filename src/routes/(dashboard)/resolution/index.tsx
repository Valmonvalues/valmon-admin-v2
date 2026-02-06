import { useState } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import { ReusableTable } from '@/components/table/ReusableTable'
import { useResolution } from '@/services/resolution.service'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Ticket } from '@/types/resolution.types'
import useSortedData from '@/hook/sortData'
import type { Id } from '@/types/global.type'
import { resolutionServicesColumns } from '@/columns/resolutionServicesColumns'
// import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import TabHeader from '@/components/TabHeader'
import { SimpleGrid } from '@mantine/core'
import StatCard from '@/components/StatCard'
import { formatNumber } from '@/utils/formatters'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'
import { capitalizeKey } from '@/components/utils/helper'

export const Route = createFileRoute('/(dashboard)/resolution/')({
  component: Resolution,
  loader: () => routeGaurd(allowedRoles.resolution),
})

function Resolution() {
  const navigate = useNavigate()
  const { listingServices, listingMarketPlace } = useResolution()
  const { data: serviceData, isLoading: servicesLoading } = listingServices()
  // isLoading: marketplaceLoading
  const { data: marketplaceData } = listingMarketPlace()
  const services = serviceData?.tickets || []
  const ticketCountServices = serviceData?.summary?.ticketCount
  const totalValueServices = serviceData?.summary?.ticketsAmount
  const resolvedTicketCountServices = serviceData?.summary?.resolvedTicketCount
  const resolvedTicketValueServices = serviceData?.summary?.resolvedTicketValue

  const marketplace = marketplaceData?.tickets || []
  console.log(marketplaceData)

  const [search, setSearch] = useState('')
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('services')
  // const [selectedService, setSelectedService] = useState<null | Id>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ticket
    direction: 'asc' | 'desc'
  }>({ key: 'employer', direction: 'asc' })

  const sortedTServices = useSortedData(
    capitalizeKey(services, 'employer'),
    sortConfig,
  )
  const [page] = useState(1)

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

  // const handleDeleteClick = (transactionId: Id) => {
  //   console.log(transactionId)

  //   setSelectedService(transactionId)
  //   setDeleteModalOpen(true)
  // }

  // const handleConfirmDelete = () => {
  //   // delete.mutate(selectedService as Id, {
  //   //   onSuccess: () => {
  //   //     setSelectedService(null)
  //   //     setDeleteModalOpen(false)
  //   //   },
  //   //   onError: (error) => {
  //   //     console.error('Error deleting user:', error)
  //   //     notifications.show({
  //   //       title: 'Error',
  //   //       message: 'Failed to delete user. Please try again.',
  //   //       color: 'red',
  //   //     })
  //   //   },
  //   // })
  //   console.log(selectedService)
  //   console.log(marketplaceLoading)
  // }

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

      {activeTab === 'services' && (
        <>
          <SimpleGrid cols={4} spacing="lg" className="mb-6 max-w-[1000px]">
            <StatCard
              title="All Reports"
              // value={services.length}
              value={ticketCountServices}
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
                onSearchChange={setSearch}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            {/* <ConfirmDeleteModal
              opened={deleteModalOpen}
              onCancel={() => setDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              title="Delete resolution"
              message="Are you sure you want to delete this service? This action cannot be undone."
              // loading={deleteClosed.isPending}
            /> */}
          </div>
        </>
      )}

      {activeTab === 'market-place' && (
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
            <StatCard
              title="Resolved Value"
              // value={formatNumber(skillsData?.valmon_earning)}
              // color="bg-green-100"
              // image={earningImage}
            />
          </SimpleGrid>

          {/* <div className="">
            <div className="">
              <ReusableTable
                title="Report"
                totalCount={marketplace.length}
                data={sortedTServices}
                columns={resolutionServicesColumns({
                  page,
                  handleView,
                  handleDeleteClick,
                })}
                isLoading={marketplaceLoading}
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
              title="Delete resolution"
              message="Are you sure you want to delete this service? This action cannot be undone."
              // loading={deleteClosed.isPending}
            />
          </div> */}
        </>
      )}
    </DashboardLayout>
  )
}
