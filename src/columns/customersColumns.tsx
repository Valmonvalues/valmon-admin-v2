import type { ReactNode } from 'react'
import {
  ActionIcon,
  Menu,
  Image,
  Text,
  Badge,
  Group,
  Stack,
} from '@mantine/core'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
import type { Customers } from '@/types/skills.types'

// interface CustomerColumnHandlers {
//   handleView: (id: Id) => void
//   handleDeleteClick: (id: Id) => void
// }

// export const customersColumns = (
//   {
//     //   handleView,
//     //   handleDeleteClick,
//   }: CustomerColumnHandlers,
// ): ColumnDef<Customers>[] => [
export const customersColumns = (): ColumnDef<Customers>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => index + 1,
  },
  {
    key: 'image',
    header: 'Image',
    sortable: false,
    render: (customer): ReactNode => (
      <Image
        src={customer.image}
        alt={customer.name}
        style={{ width: 35, height: 35, borderRadius: 8, objectFit: 'cover' }}
        radius="xl"
        fit="cover"
      />
    ),
  },
  {
    key: 'name',
    header: 'Customer',
    sortable: true,
    render: (customer): ReactNode => (
      <Stack gap={0} style={{ lineHeight: 1.2 }}>
        <Text fw={500}>{customer.name}</Text>
        <Text size="sm" c="dimmed">
          {customer.id}
        </Text>
      </Stack>
    ),
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    render: (customer): ReactNode => (
      <Stack gap={0} style={{ lineHeight: 1.2 }}>
        <Text fw={500}>{customer.email}</Text>
        {/* <Text size="sm" c="dimmed">
          {customer.id}
        </Text> */}
      </Stack>
    ),
  },
  {
    key: 'listings_count',
    header: 'Market Listings',
    render: (customer): ReactNode => customer.listings_count,
  },
  {
    key: 'join_date',
    header: 'Join Date',
    render: (customer): ReactNode =>
      new Date(customer.join_date).toLocaleDateString(),
  },
  {
    key: 'reported_count',
    header: 'Times Reported',
    render: (customer): ReactNode => customer.reported_count,
  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
    render: (customer): ReactNode => customer.type,
    // <Badge
    //   color="blue"
    //   variant="light"
    //   style={{
    //     whiteSpace: 'wrap',
    //     flexShrink: 0,
    //   }}
    // >
    //   {customer.type}
    // </Badge>
  },
  {
    key: 'last_seen_at',
    header: 'Last Seen',
    render: (customer): ReactNode =>
      new Date(customer.last_seen_at).toLocaleDateString(),
    // customer.last_seen_at,
  },
  {
    key: 'status',
    header: 'Status',
    render: (customer): ReactNode => (
      <Badge
        color={customer.status === 'ACTIVE' ? 'green' : 'red'}
        variant="light"
      >
        {customer.status}
      </Badge>
    ),
  },
]
