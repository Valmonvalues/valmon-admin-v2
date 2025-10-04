import { perPage } from '@/constant/config'
import { Pagination, Group } from '@mantine/core'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <Group justify="space-between" align="center" mt="lg">
      <div className="flex items-center gap-2">
        <p className="text-gray-500">Items/Page</p>
        <div className="background px-2 rounded-md">
          {/* per page */}
          <span className="text-sm text-white">{perPage}</span>
        </div>
      </div>
      <Pagination
        value={currentPage}
        onChange={onPageChange}
        total={totalPages}
        color="#AD7A22"
        radius="md"
        withEdges
      />
    </Group>
  )
}
