import DashboardLayout from '@/layout/DashboardLayout'
import { useUser } from '@/services/user.service'
import { SimpleGrid } from '@mantine/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import StatCard from '@/components/StatCard'
import type { Id } from '@/types/global.type'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { notifications } from '@mantine/notifications'
import { ReusableTable } from '@/components/table/ReusableTable'
import { userColumns } from '@/columns/userColumns'
import { PaginationControls } from '@/components/table/PaginationControls'
import { perPage as perpage } from '@/constant/config'
import type { User } from '@/types/user.types'

export const Route = createFileRoute('/(dashboard)/users/')({
  component: Users,
})

function Users() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { listUsers, getUsersSummary, deleteUser } = useUser()
  const { data, isLoading } = listUsers({ page, perpage })
  const { data: usersSummary } = getUsersSummary
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<null | Id>(null)
  const users = data?.users ?? []
  const summary = usersSummary?.data ?? []
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })
  const totalUsers = data?.pagination?.total ?? 0
  const totalPages = Math.ceil(totalUsers / perpage)

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  const sortedUsers = useMemo(() => {
    const sortableItems = [...users]

    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sortableItems
  }, [users, sortConfig])

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleView = (userId: Id) => {
    navigate({ to: `/users/${userId}` })
  }

  const handleDeleteClick = (userId: Id) => {
    setSelectedUser(userId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteUser.mutate(selectedUser as Id, {
      onSuccess: () => {
        setSelectedUser(null)
        setDeleteModalOpen(false)
      },
      onError: (error) => {
        console.error('Error deleting user:', error)
        notifications.show({
          title: 'Error',
          message: 'Failed to delete user. Please try again.',
          color: 'red',
        })
      },
    })
  }

  return (
    <DashboardLayout>
      <div className="">
        <SimpleGrid cols={3} spacing="lg" className="mb-6 max-w-[900px]">
          <StatCard
            title="All Users"
            value={summary.total_users}
            color="bg-pink-100"
          />
          <StatCard
            title="Service Providers"
            value={summary.service_providers}
            color="bg-purple-100"
          />
          <StatCard
            title="Normal Users"
            value={summary.employers}
            color="bg-green-100"
          />
        </SimpleGrid>

        <ReusableTable
          title="Customers"
          totalCount={totalUsers}
          data={sortedUsers}
          columns={userColumns({
            page,
            perpage,
            formatDate,
            handleView,
            handleDeleteClick,
          })}
          isLoading={isLoading}
          searchQuery={search}
          onSearchChange={setSearch}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {!isLoading && totalPages > 1 && (
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        loading={deleteUser.isPending}
      />
    </DashboardLayout>
  )
}
