import DashboardLayout from '@/layout/DashboardLayout'
import { useUser } from '@/services/user.service'
import { SimpleGrid } from '@mantine/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import StatCard from '@/components/StatCard'
import type { Id } from '@/types/global.type'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { notifications } from '@mantine/notifications'
import { ReusableTable } from '@/components/table/ReusableTable'
import { userColumns } from '@/columns/userColumns'
import { PaginationControls } from '@/components/table/PaginationControls'
import { perPage as perpage } from '@/constant/config'
import type { UserListType } from '@/types/user.types'
import useSortedData from '@/hook/sortData'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'

import profile from '@/assets/icons/cardprofile.svg'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'

export const Route = createFileRoute('/(dashboard)/users/')({
  component: Users,
  loader: () => routeGaurd(allowedRoles.users),
})

function Users() {
  const navigate = useNavigate()
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const [page, setPage] = useState(1)
  const { listUsers, getUsersSummary, deleteUser } = useUser()
  const { data, isLoading } = listUsers({ page, perpage })
  const { data: usersSummary } = getUsersSummary
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<null | Id>(null)
  const users = data?.users ?? []
  // const summary = usersSummary?.data ?? []
  const totalUsers = data?.pagination?.total ?? 0
  const totalPages = Math.ceil(totalUsers / perpage)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserListType
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })

  const filteredUsers =
    debouncedSearch.trim() === ''
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedUsers = useSortedData(filteredUsers, sortConfig)

  const handleSort = (key: keyof UserListType) => {
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
        notifications.show({
          title: 'Success',
          message: 'User deleted',
          color: 'green',
        })
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
            value={usersSummary?.total_users}
            color="bg-pink-100"
            image={profile}
          />
          <StatCard
            title="Service Providers"
            value={usersSummary?.service_providers}
            color="bg-purple-100"
            image={profile}
          />
          <StatCard
            title="Client"
            value={usersSummary?.employers}
            color="bg-green-100"
            image={profile}
          />
        </SimpleGrid>

        <ReusableTable
          title="Customers"
          totalCount={totalUsers}
          data={sortedUsers}
          columns={userColumns({
            page,
            handleView,
            handleDeleteClick,
          })}
          isLoading={isLoading}
          searchQuery={search}
          onSearchChange={handleSearch}
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
