import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

import RoleList from './RoleList'
import RoleDetails from './RoleDetails'

import { useRolePermissions } from '@/services/rolePermissions.service'
// import { useUser } from '@/services/user.service'
import { useHandleDelete } from '@/hook/useHandleDelete'
import type { Id } from '@/types/global.type'
import { useAccessManagement } from '@/hook/useAccessManagement'

function RoleManagement() {
  const [selectedRoleId, setSelectedRoleId] = useState<Id>(1)

  const {
    getAllPermissions,
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
  } = useRolePermissions()

  // const { getMe } = useUser()

  const { canAccess } = useAccessManagement()
  const canManage = canAccess('manage_admin_roles')

  // const { data: me } = getMe()
  const { data: roles } = getAllRoles()
  const { data: permissions } = getAllPermissions()
  const { data: roleById } = getRoleById(selectedRoleId)

  const { mutate: createNewRole, isPending: creating } = createRole
  const { mutate: roleUpdate, isPending: updatingRole } = updateRole

  const isSavingRole = creating || updatingRole

  const roleForm = useForm({
    initialValues: {
      roleName: '',
      description: '',
      // color: '',
    },
    validate: {
      roleName: (value) =>
        value.trim().length === 0 ? 'Role name is required' : null,
    },
  })

  const [rolePerm, setRolePerm] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (roleById) {
      roleForm.setValues({
        roleName: roleById?.name || '',
        description: roleById?.description || '',
        // color: roleById?.color || '',
      })

      setRolePerm(new Set(roleById?.permissions?.map((p: any) => p.id) || []))
      return
    }

    roleForm.setValues({
      roleName: '',
      description: '',
      // color: '',
    })
    setRolePerm(new Set())
  }, [roleById])

  const togglePermission = (id: number) => {
    if (!canManage) return

    setRolePerm((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  const handleAddRole = () => {
    if (!canManage) return

    setSelectedRoleId('')
    roleForm.reset()
    setRolePerm(new Set())
  }

  const handleSaveAddRole = () => {
    if (!canManage) return

    const validation = roleForm.validate()
    if (validation.hasErrors) return

    const payload = {
      name: roleForm.values.roleName,
      description: roleForm.values.description,
      // color: roleForm.values.color,
      permissions: Array.from(rolePerm),
    }

    if (!selectedRoleId) {
      createNewRole(payload, {
        onSuccess: (data: any) => {
          notifications.show({
            title: 'Success',
            message: 'Role created successfully',
            color: 'green',
          })

          setSelectedRoleId(data.id)
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message: error?.message || 'Failed to create role',
            color: 'red',
          })
        },
      })

      return
    }

    roleUpdate(
      { id: selectedRoleId, payload },
      {
        onSuccess: (data: any) => {
          notifications.show({
            title: 'Success',
            message: 'Role updated successfully',
            color: 'green',
          })

          setSelectedRoleId(data.id)
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message: error?.message || 'Failed to update role',
            color: 'red',
          })
        },
      },
    )
  }

  const {
    modalOpen,
    setModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    isDeleting,
  } = useHandleDelete({
    mutation: deleteRole,
    entityName: 'Manager Role',
    reset: () => {
      setSelectedRoleId(1)
      roleForm.reset()
      setRolePerm(new Set())
    },
  })

  const handleDelete = () => {
    if (!canManage) return

    if (!selectedRoleId) return

    if (roleById?.name === 'Super Admin') {
      notifications.show({
        title: 'Not allowed',
        message: 'Super Admin role cannot be deleted',
        color: 'red',
      })
      return
    }

    handleDeleteClick(selectedRoleId)
  }

  // const isSuperAdminUser = me?.role === 'super_admin'
  // const isSuperAdminRole = roleById?.name === 'Super Admin'
  // const shouldDisable = !isSuperAdminUser || isSuperAdminRole

  const isSuperAdminRole = roleById?.name === 'Super Admin'
  const shouldDisable = !canManage || isSuperAdminRole

  return (
    <div className="flex gap-6 w-full">
      <RoleList
        roles={roles || []}
        selectedRoleId={selectedRoleId}
        setSelectedRoleId={setSelectedRoleId}
        onAddRole={handleAddRole}
        canManage={canManage}
      />

      <RoleDetails
        selectedRoleId={selectedRoleId}
        roleById={roleById}
        permissions={permissions || []}
        rolePerm={rolePerm}
        roleForm={roleForm}
        shouldDisable={shouldDisable}
        isSavingRole={isSavingRole}
        isDeleting={isDeleting}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSave={handleSaveAddRole}
        onDelete={handleDelete}
        onConfirmDelete={handleConfirmDelete}
        onTogglePermission={togglePermission}
        // me={me}
        canManage={canManage}
      />
    </div>
  )
}

export default RoleManagement
