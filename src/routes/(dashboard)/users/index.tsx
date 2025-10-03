import DashboardLayout from '@/layout/DashboardLayout'
import { useUser } from '@/services/user.service'
import type { User } from '@/types/user.types'
import {
  ActionIcon,
  Badge,
  Divider,
  Group,
  Loader,
  Menu,
  Paper,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import {
  IconDotsVertical,
  IconEye,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import { IconArrowDown } from '@tabler/icons-react'
import StatCard from '@/components/StatCard'

export const Route = createFileRoute('/(dashboard)/users/')({
  component: Users,
})

function Users() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perpage = 14
  const { listUsers, getUsersSummary } = useUser()
  // const { data: users, isLoading } = listUsers
  const { data, isLoading } = listUsers({ page, perpage })
  const { data: usersSummary, isLoading: userSummaryLoader } = getUsersSummary

  const users: User[] = data?.data.users ?? []
  const summary = usersSummary?.data ?? []

  console.log('users', users)
  console.log('data', data)
  // console.log('getUsersSummary', summary)

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB')
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

        <Paper
          shadow="xs"
          radius="md"
          p="md"
          withBorder
          className="max-w-[1300px]"
        >
          <Group justify="space-between" mb="md">
            <div className="">
              <Text fw={600}>
                Customers{' '}
                <Text span c="yellow">
                  {users.length} Registered
                </Text>
              </Text>
              <Text size="sm" c="dimmed">
                List Of All Customers on The Platform
              </Text>
            </div>
            <TextInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
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
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">
                        Serial Number
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">Image</Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className=""> Name</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Email</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Market Listing</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Joined Date</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Times Reported</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Types</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Last Seen</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                      <Table.Th className="whitespace-nowrap">
                        <div className="flex items-center ">
                          <div className="">Status</div>
                          <IconArrowDown stroke={1} size={15} />
                        </div>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {users.map((user, idx) => {
                      return (
                        <Table.Tr key={idx}>
                          <Table.Td>{idx + 1}</Table.Td>
                          <Table.Td>
                            <img
                              src={user.image}
                              alt={user.name}
                              width={32}
                              height={32}
                            />
                          </Table.Td>
                          <Table.Td>{user.name}</Table.Td>
                          <Table.Td>{user.email}</Table.Td>
                          <Table.Td>{user.listings_count}</Table.Td>
                          <Table.Td>{formatDate(user.join_date)}</Table.Td>
                          <Table.Td>{user.reported_count}</Table.Td>
                          <Table.Td className="whitespace-nowrap">
                            {user.type}
                          </Table.Td>
                          <Table.Td>{user.last_seen_at}</Table.Td>
                          {/* <Table.Td>{user.status}</Table.Td> */}
                          <Table.Td>
                            <Badge
                              color={
                                user.status.toLocaleLowerCase() === 'active'
                                  ? 'green'
                                  : 'yellow'
                              }
                              variant="light"
                            >
                              {user.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Menu>
                              <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                  <IconDotsVertical size={18} stroke={2} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item
                                  leftSection={<IconEye size={16} />}
                                  variant="subtle"
                                  color="gray"
                                  onClick={() =>
                                    console.log('View user', user.email)
                                  }
                                >
                                  View
                                </Menu.Item>
                                <Menu.Item
                                  color="red"
                                  leftSection={<IconTrash size={16} />}
                                  onClick={() =>
                                    console.log('Delete user', user.email)
                                  }
                                >
                                  Delete
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      )
                    })}
                  </Table.Tbody>
                </Table>
              </div>
            </ScrollArea>
          )}
        </Paper>

        <div className="pagination-controls">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={
              page >= Math.ceil((data?.data.pagination.total || 0) / perpage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
