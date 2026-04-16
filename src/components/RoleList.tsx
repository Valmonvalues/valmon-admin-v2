import { Stack, Text, Group } from '@mantine/core'
import { IconShield, IconUsers } from '@tabler/icons-react'
import BaseButton from './BaseButton'
import type { Id } from '@/types/global.type'

type Role = {
  id: Id
  name: string
  users_count?: number
}

interface RoleListProps {
  roles: Role[]
  selectedRoleId: Id | null
  setSelectedRoleId: (id: Id) => void
  onAddRole: () => void
}

function RoleList({
  roles,
  selectedRoleId,
  setSelectedRoleId,
  onAddRole,
}: RoleListProps) {
  return (
    <div className="w-[300px] bg-white rounded-xl p-4 shadow-sm">
      <Text fw={600} mb="sm">
        User Roles
      </Text>

      <Stack gap="sm">
        {roles
          ?.slice()
          ?.sort((a, b) => Number(a.id) - Number(b.id))
          ?.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedRoleId === role.id
                  ? 'bg-[var(--color-bg-primary)] border-[var(--color-bright-gold)]'
                  : 'border-gray-200'
              }`}
            >
              <Group justify="space-between" mb={5}>
                <Group gap={6}>
                  <IconShield size={20} color="red" />
                  <Text fw={500}>{role.name}</Text>
                </Group>

                <Group
                  gap={5}
                  align="center"
                  className="px-2 py-0.5 rounded-xl border border-gray-200 bg-gray-100"
                >
                  <IconUsers size={12} />
                  <Text size="xs">{role.users_count ?? 0}</Text>
                </Group>
              </Group>
            </div>
          ))}

        <BaseButton
          title="Add Role"
          className="px-4 py-2 w-auto mt-2"
          outline
          onClick={onAddRole}
        />
      </Stack>
    </div>
  )
}

export default RoleList
