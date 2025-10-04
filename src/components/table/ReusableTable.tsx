import React from 'react'
import {
  Paper,
  Group,
  Text,
  TextInput,
  Divider,
  Loader,
  ScrollArea,
  Table,
} from '@mantine/core'
import { IconSearch, IconArrowUp, IconArrowDown } from '@tabler/icons-react'
import { type Id } from '@/types/global.type'

export type SortConfig<T> = {
  key: keyof T
  direction: 'asc' | 'desc'
}

export interface ColumnDef<T> {
  key: any
  header: React.ReactNode
  render: (item: T, index: number) => React.ReactNode
}

interface ReusableTableProps<T> {
  title: string
  totalCount?: number
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  searchQuery: string
  onSearchChange: (value: string) => void
  sortConfig: SortConfig<T>
  onSort: (key: keyof T) => void
}

export function ReusableTable<T extends { id: Id }>({
  title,
  totalCount,
  data,
  columns,
  isLoading,
  searchQuery,
  onSearchChange,
  sortConfig,
  onSort,
}: ReusableTableProps<T>) {
  const renderSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <IconArrowDown stroke={1} size={15} />
    }
    if (sortConfig.direction === 'asc') {
      return <IconArrowUp stroke={1.5} size={15} />
    }
    return <IconArrowDown stroke={1.5} size={15} />
  }

  return (
    <Paper shadow="xs" radius="md" p="md" withBorder className="flex-grow">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>
            {title}{' '}
            <Text span c="yellow" ml="sm">
              {totalCount} Registered
            </Text>
          </Text>
          <Text size="sm" c="dimmed">
            List Of All {title} on The Platform
          </Text>
        </div>
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
      </Group>
      <Divider my="sm" />
      {isLoading ? (
        <Group justify="center" p="xl">
          <Loader />
        </Group>
      ) : (
        <ScrollArea h={700} offsetScrollbars scrollbarSize={8}>
          <div className="min-w-[1400px]">
            <Table highlightOnHover>
              <Table.Thead className="text-[12px]">
                <Table.Tr className="text-gray-500">
                  {columns.map((column) => (
                    <Table.Th
                      key={String(column.key)}
                      className="whitespace-nowrap cursor-pointer"
                      onClick={() => onSort(column.key)}
                    >
                      <div className="flex items-center">
                        <div>{column.header}</div>
                        {renderSortIcon(String(column.key))}
                      </div>
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((item, index) => (
                  <Table.Tr key={item.id} className="text-gray-800">
                    {columns.map((column) => (
                      <Table.Td key={String(column.key)}>
                        {column.render(item, index)}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </ScrollArea>
      )}
    </Paper>
  )
}
