import { Box, Group, Stack, Switch, Text } from '@mantine/core'
import { IconCheck, IconShieldCheckered, IconUsers } from '@tabler/icons-react'

import BaseButton from './BaseButton'
import ConfirmDeleteModal from './modals/ConfirmDeleteModal'
import { AppInput } from './Reuseables'

type Permission = {
  id: number
  name: string
}

type RoleDetailsData = {
  id?: number | string
  name?: string
  description?: string
  color?: string
  users_count?: number
  access_level?: string
}

interface RoleDetailsProps {
  selectedRoleId: number | string | null
  roleById?: RoleDetailsData
  permissions: Permission[]
  rolePerm: Set<number>
  roleForm: any
  shouldDisable: boolean
  isSavingRole: boolean
  isDeleting: boolean
  modalOpen: boolean
  canManage: boolean
  setModalOpen: (value: boolean) => void
  onSave: () => void
  onDelete: () => void
  onConfirmDelete: () => void
  onTogglePermission: (id: number) => void
  // me?: {
  //   role?: string
  // }
}

function RoleDetails({
  selectedRoleId,
  roleById,
  permissions,
  rolePerm,
  roleForm,
  shouldDisable,
  isSavingRole,
  isDeleting,
  modalOpen,
  canManage,

  setModalOpen,
  onSave,
  onDelete,
  onConfirmDelete,
  onTogglePermission,
}: RoleDetailsProps) {
  const formatPermissionName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
      <Group justify="space-between" mb="md">
        <Text fw={600}>
          {selectedRoleId ? 'Manage User Role' : 'Create New Role'}
        </Text>

        <Group>
          <BaseButton
            title="Delete"
            outline
            color="#ef4444"
            className="px-4 py-2 w-auto"
            onClick={onDelete}
            disabled={!canManage || !selectedRoleId}
          />

          <ConfirmDeleteModal
            opened={modalOpen}
            onCancel={() => setModalOpen(false)}
            onConfirm={onConfirmDelete}
            title="Delete Role"
            message="Are you sure you want to delete this role? This action cannot be undone."
            loading={isDeleting}
          />

          <BaseButton
            title="Save"
            className="px-4 py-2 background w-auto"
            onClick={onSave}
            loading={isSavingRole}
            disabled={!canManage}
          />
        </Group>
      </Group>

      <Stack gap="md">
        {/* <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4"> */}
        <AppInput
          label="Role Name"
          size="md"
          {...roleForm.getInputProps('roleName')}
          readOnly={shouldDisable}
        />

        {/* <ColorInput
            label="Role Color"
            size="md"
            placeholder="Pick color"
            format="hex"
            swatches={[
              '#845ef7',
              '#fa5252',
              '#12b886',
              '#fab005',
              '#228be6',
              '#15aabf',
            ]}
            {...roleForm.getInputProps('color')}
            disabled={shouldDisable}
            leftSection={<IconShield size={20} color="red" />}
            classNames={{ label: 'mb-2 font-medium' }}
          /> */}
        {/* </div> */}

        <AppInput
          label="Description"
          {...roleForm.getInputProps('description')}
          readOnly={shouldDisable}
        />

        <Group grow mt="md">
          <Box className="p-4 bg-gray-50 rounded-lg">
            <Group gap={4} align="center">
              <IconUsers size={14} />
              <Text size="xs">Active Users</Text>
            </Group>
            <Text fw={600}>{roleById?.users_count ?? 0}</Text>
          </Box>

          <Box className="p-4 bg-gray-50 rounded-lg">
            <Group gap={4} align="center">
              <IconShieldCheckered size={14} />
              <Text size="xs">Permissions</Text>
            </Group>
            <Text fw={600}>{rolePerm.size}</Text>
          </Box>

          <Box className="p-4 bg-gray-50 rounded-lg">
            <Group gap={4} align="center">
              <IconCheck size={14} />
              <Text size="xs">Access Level</Text>
            </Group>
            <Text fw={600}>{roleById?.access_level || '-'}</Text>
          </Box>
        </Group>

        <Stack mt="md" gap="sm">
          {permissions?.map((perm) => (
            <Group
              key={perm.id}
              justify="space-between"
              className="px-3 py-2 rounded-lg bg-gray-50"
            >
              <Group gap="sm">
                <div className="flex items-center justify-center w-5 h-5 rounded bg-orange-100">
                  <IconCheck color="var(--color-dark-gold)" className="p-1" />
                </div>

                <Text size="sm">{formatPermissionName(perm.name)}</Text>
              </Group>
              <Switch
                checked={rolePerm.has(perm.id)}
                color="var(--color-dark-gold)"
                onChange={() => {
                  if (shouldDisable) return
                  onTogglePermission(perm.id)
                }}
                styles={{
                  input: {
                    cursor: shouldDisable ? 'not-allowed' : 'pointer',
                    opacity: 1,
                  },
                  track: {
                    cursor: shouldDisable ? 'not-allowed' : 'pointer',
                    opacity: 1,
                  },
                  thumb: {
                    cursor: shouldDisable ? 'not-allowed' : 'pointer',
                    opacity: 1,
                  },
                }}
              />
            </Group>
          ))}
        </Stack>

        <Box
          mt="md"
          p="md"
          className="bg-blue-50 rounded-lg border border-blue-200"
        >
          <Text fw={500} size="sm" mb="xs">
            <span className="text-blue-900">💡 Role Management Tips</span>
          </Text>

          <ul className="text-xs text-blue-800 list-disc pl-4">
            <li>
              Assign the minimum permissions necessary for each user's role
            </li>
            <li>Regularly review and audit user permissions for security</li>
            <li>Super Admin role should be limited to key personnel only</li>
            <li>
              Custom roles can only be created for specific organizational needs
            </li>
          </ul>
        </Box>
      </Stack>
    </div>
  )
}

export default RoleDetails
