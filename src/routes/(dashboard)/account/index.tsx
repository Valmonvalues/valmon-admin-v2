import { useState } from 'react'
import BaseButton from '@/components/BaseButton'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { ReusableTable } from '@/components/table/ReusableTable'
import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'
import useSortedData from '@/hook/sortData'
import { useAccountManagers } from '@/services/accountManagers.service'
import type { AccountManager } from '@/types/accountManagers.types'
import type { Id } from '@/types/global.type'
import { accountManagerColumns } from '@/columns/accountManagersColumns'
import { useHandleDelete } from '@/hook/useHandleDelete'
import { allowedRoles, roles } from '@/data/roles'
import { useGlobalContext } from '@/contexts/GlobalContext'
import { routeGaurd } from '@/components/utils/routeGuard'
import { useDebouncedSearch } from '@/hook/useDebouncedSearch'

export const Route = createFileRoute('/(dashboard)/account/')({
  component: Account,
  loader: () => routeGaurd(allowedRoles.marketPlace),
})

function Account() {
  const { openFormModal, setOpenFormModal } = useGlobalContext()
  const { listAccountManagers, addManager, deleteManager } =
    useAccountManagers()
  const { data, isLoading: managersLoading } = listAccountManagers()
  const managers = data || []

  // const [loading, setLoading] = useState(false)

  const {
    modalOpen: deleteModalOpen,
    setModalOpen: setDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHandleDelete({
    mutation: deleteManager,
    entityName: 'admin',
  })

  // console.log(managers)
  const { search, debouncedSearch, handleSearch } = useDebouncedSearch()
  const [page] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AccountManager
    direction: 'asc' | 'desc'
  }>({ key: 'id', direction: 'asc' })

  const [managersSortConfig] = useState<{
    key: keyof AccountManager
    direction: 'asc' | 'desc'
  }>({ key: 'id', direction: 'asc' })

  const filteredManagers =
    debouncedSearch.trim() === ''
      ? managers
      : managers.filter((man: any) =>
          man.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )

  const sortedManagers = useSortedData(filteredManagers, sortConfig)

  const handleSort = (key: keyof AccountManager) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleView = (listingId: Id) => {
    // navigate({ to: `/${}` })
    console.log('View listing:', listingId)
  }

  const handleAddManager = async (admin: Record<string, any>) => {
    try {
      // setLoading(true)

      const formData = new FormData()
      formData.append('first_name', admin.firstName)
      formData.append('last_name', admin.lastName)
      formData.append('email', admin.email)
      formData.append('role', admin.role)

      if (admin.file instanceof File) {
        formData.append('image', admin.file)
        console.log(admin.file)
      }

      await addManager.mutateAsync(formData)
      setOpenFormModal(false)
    } catch (error) {
      console.error('Error adding manager:', error)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="">
        <ReusableTable
          title="Account Managers"
          // totalCount={totalCategories} // NOT available issues
          data={sortedManagers}
          columns={accountManagerColumns({
            page,
            handleView,
            handleDeleteClick,
          })}
          isLoading={managersLoading}
          searchQuery={search}
          onSearchChange={handleSearch}
          sortConfig={managersSortConfig}
          onSort={handleSort}
          headerActions={
            <BaseButton
              title="Add New"
              showPlusIcon={true}
              modalTitle="Add New Manager"
              opened={openFormModal}
              onClose={() => setOpenFormModal(false)}
              onClick={() => setOpenFormModal(true)}
              fields={[
                { name: 'firstName', label: 'First Name', type: 'text' },
                { name: 'lastName', label: 'Last Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                {
                  name: 'role',
                  label: 'Role',
                  type: 'select',
                  options: roles
                    .filter((role) => role.name !== 'super_admin')
                    .map((role) => {
                      return {
                        value: role.name,
                        label: role.label,
                      }
                    }),
                },
                // { name: 'file', label: 'Upload Photo', type: 'file' },
                {
                  name: 'file',
                  label: 'Upload Photo',
                  type: 'file',
                  variant: 'profile_picture-upload',
                },
              ]}
              onSubmit={handleAddManager}
              loading={addManager.isPending}
              className="bg-dark-gold hover:bg-bright-gold text-white w-auto px-6 py-2 rounded-md transition-colors duration-200 shadow-none border-0"
            />
          }
        />
      </div>

      <ConfirmDeleteModal
        opened={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
        loading={deleteManager.isPending}
      />
    </DashboardLayout>
  )
}
