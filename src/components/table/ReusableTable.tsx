import React from 'react'
import {
  Paper,
  Group,
  Text,
  Divider,
  Loader,
  ScrollArea,
  Table,
} from '@mantine/core'
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react'
import { type Id } from '@/types/global.type'

export type SortConfig<T> = {
  key: keyof T
  direction: 'asc' | 'desc'
}

export interface ColumnDef<T> {
  key: any
  header: React.ReactNode
  sortable?: boolean
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

  headerActions?: React.ReactNode
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
  headerActions,
}: ReusableTableProps<T>) {
  const renderSortIcon = (columnKey: string, sortable?: boolean) => {
    // if (!sortable) return null
    if (sortable === false) return null

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

        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {headerActions && (
            <div className="flex-shrink-0">{headerActions}</div>
          )}
        </div>
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
                      onClick={() => {
                        // if (!column.sortable) return
                        onSort(column.key)
                      }}
                    >
                      <div className="flex items-center">
                        <div>{column.header}</div>
                        {renderSortIcon(String(column.key), column.sortable)}
                      </div>
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data?.map((item, index) => (
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
