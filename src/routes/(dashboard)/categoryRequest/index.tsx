import { serviceRequestColumns } from '@/columns/serviceRequestColumns'
import { ReusableTable } from '@/components/table/ReusableTable'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'
import DashboardLayout from '@/layout/DashboardLayout'
import { useCategoryRequest } from '@/services/categoryRequest.service'
import type { CategoryRequest } from '@/types/categoryRequest.types'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Group } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import RejectionModal from '@/components/modals/RejectionModal'

export const Route = createFileRoute('/(dashboard)/categoryRequest/')({
  component: CategoryRequest,
  loader: () => routeGaurd(allowedRoles.marketPlace),
})

function CategoryRequest() {
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState<CategoryRequest | null>(null)

  const { listCategoryRequest, actionCategoryRequest } = useCategoryRequest()
  const { data, isLoading: isRequestLoading } = listCategoryRequest()

  const serviceRequest = data ?? []
  const totalListings = serviceRequest.length ?? 0

  const [requestSortConfig, setRequestSortConfig] = useState<{
    key: keyof CategoryRequest
    direction: 'asc' | 'desc'
  }>({ key: 'created_at', direction: 'asc' })

  const handleSort = (key: keyof CategoryRequest) => {
    setRequestSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleApprove = (request: CategoryRequest) => {
    actionCategoryRequest.mutate(
      {
        request_ids: [request.id],
        action: 'approve',
      },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Success',
            message: `Category request from ${request.requester_name} has been approved`,
            color: 'green',
          })
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to approve request',
            color: 'red',
          })
        },
      },
    )
  }

  const handleOpenRejectionModal = (request: CategoryRequest) => {
    setSelectedRequest(request)
    setRejectionModalOpen(true)
  }

  const handleRejectWithReason = (reason: string) => {
    if (!selectedRequest) return

    actionCategoryRequest.mutate(
      {
        request_ids: [selectedRequest.id],
        action: 'reject',
        reason: reason,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Success',
            message: `Category request from ${selectedRequest.requester_name} has been rejected`,
            color: 'green',
          })
          setRejectionModalOpen(false)
          setSelectedRequest(null)
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to reject request',
            color: 'red',
          })
        },
      },
    )
  }

  // const handleReject = (request: CategoryRequest) => {
  //   actionCategoryRequest.mutate(
  //     {
  //       request_ids: [request.id],
  //       action: 'reject',
  //       reason: 'Request rejected by admin',
  //     },
  //     {
  //       onSuccess: () => {
  //         notifications.show({
  //           title: 'Success',
  //           message: `Category request from ${request.requester_name} has been rejected`,
  //           color: 'orange',
  //         })
  //       },
  //       onError: (error: any) => {
  //         notifications.show({
  //           title: 'Error',
  //           message:
  //             error?.response?.data?.message || 'Failed to reject request',
  //           color: 'red',
  //         })
  //       },
  //     },
  //   )
  // }

  const handleApproveAll = () => {
    if (serviceRequest.length === 0) {
      notifications.show({
        title: 'Warning',
        message: 'No requests to approve',
        color: 'yellow',
      })
      return
    }

    const requestIds = serviceRequest.map((req: any) => req.id)

    actionCategoryRequest.mutate(
      {
        request_ids: requestIds,
        action: 'approve',
      },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Success',
            message: `${requestIds.length} category request${requestIds.length > 1 ? 's' : ''} approved successfully`,
            color: 'green',
          })
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to approve requests',
            color: 'red',
          })
        },
      },
    )
  }

  const handleRejectAll = () => {
    if (serviceRequest.length === 0) {
      notifications.show({
        title: 'Warning',
        message: 'No requests to reject',
        color: 'yellow',
      })
      return
    }

    const requestIds = serviceRequest.map((req: any) => req.id)

    actionCategoryRequest.mutate(
      {
        request_ids: requestIds,
        action: 'reject',
        reason: 'Bulk rejection by admin', // Default reason for bulk reject
      },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Success',
            message: `${requestIds.length} category request${requestIds.length > 1 ? 's' : ''} rejected successfully`,
            color: 'orange',
          })
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to reject requests',
            color: 'red',
          })
        },
      },
    )
  }

  const headerActions = (
    <Group gap="xs">
      <Button
        color="green"
        size="sm"
        radius="md"
        onClick={handleApproveAll}
        loading={actionCategoryRequest.isPending}
        disabled={totalListings === 0}
      >
        Approve All
      </Button>
      <Button
        color="red"
        size="sm"
        radius="md"
        onClick={handleRejectAll}
        loading={actionCategoryRequest.isPending}
        disabled={totalListings === 0}
      >
        Deny All
      </Button>
    </Group>
  )

  return (
    <DashboardLayout>
      <ReusableTable
        title="Custom Category Request"
        subtitle="List Of Requested Categories"
        totalCount={totalListings}
        data={serviceRequest}
        columns={serviceRequestColumns({
          onApprove: handleApprove,
          onReject: handleOpenRejectionModal, // Use modal for individual rejections
        })}
        isLoading={isRequestLoading}
        sortConfig={requestSortConfig}
        onSort={handleSort}
        headerActions={headerActions}
      />

      <RejectionModal
        opened={rejectionModalOpen}
        onClose={() => {
          setRejectionModalOpen(false)
          setSelectedRequest(null)
        }}
        onSubmit={handleRejectWithReason}
        isSubmitting={actionCategoryRequest.isPending}
      />
    </DashboardLayout>
  )
}
