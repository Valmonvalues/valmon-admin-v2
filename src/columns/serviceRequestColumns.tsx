import type { ReactNode } from 'react'
import { Text, Button, Group } from '@mantine/core'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { CategoryRequest } from '@/types/categoryRequest.types'

interface ServiceRequestColumnsProps {
  onApprove: (request: CategoryRequest) => void
  onReject: (request: CategoryRequest) => void
}

export const serviceRequestColumns = ({
  onApprove,
  onReject,
}: ServiceRequestColumnsProps): ColumnDef<CategoryRequest>[] => [
  {
    key: 'sn',
    header: 'Serial Number',
    sortable: false,
    render: (_, index): ReactNode => (
      <Text size="sm" fw={500}>
        {index + 1}
      </Text>
    ),
  },
  {
    key: 'requester_name',
    header: 'Name',
    sortable: true,
    render: (request): ReactNode => (
      <Text fw={500} size="sm">
        {request.requester_name}
      </Text>
    ),
  },
  {
    key: 'category_name',
    header: 'Custom Category Name',
    sortable: true,
    render: (request): ReactNode => (
      <Text fw={500} size="sm" c="dimmed">
        {request.category_name}
      </Text>
    ),
  },
  {
    key: 'description',
    header: 'Description',
    sortable: true,
    render: (request): ReactNode => (
      <Text size="sm" c="dimmed" lineClamp={1} maw={400}>
        {request.category_description}
      </Text>
    ),
  },
  {
    key: 'created_at',
    header: 'Request Date',
    sortable: true,
    render: (request): ReactNode => (
      <Text size="sm">
        {new Date(request.created_at).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })}
      </Text>
    ),
  },
  {
    key: 'actions',
    header: '',
    sortable: false,
    render: (request): ReactNode => (
      <Group gap="xs" justify="flex-end">
        <Button
          size="xs"
          variant="outline"
          radius="md"
          color="green"
          onClick={() => onApprove(request)}
        >
          Approve
        </Button>
        <Button
          size="xs"
          variant="outline"
          radius="md"
          color="red"
          onClick={() => onReject(request)}
        >
          Reject
        </Button>
      </Group>
    ),
  },
]
