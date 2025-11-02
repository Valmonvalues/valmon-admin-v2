import { useMarketPlaces } from '@/services/marketPlaces.service'
import { notifications } from '@mantine/notifications'
import type { Id } from '@/types/global.type'

export const useHandleApproveDeny = () => {
  const { approveListing, denyListing } = useMarketPlaces()

  const handleApprove = (listingId: Id) => {
    approveListing.mutate(listingId, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'Listing approved successfully.',
          color: 'green',
        })
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          message: 'Failed to approve listing.',
          color: 'red',
        })
      },
    })
  }

  const handleReject = (listingId: Id) => {
    denyListing.mutate(listingId, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'Listing denied successfully.',
          color: 'orange',
        })
      },
      onError: () => {
        notifications.show({
          title: 'Error',
          message: 'Failed to deny listing.',
          color: 'red',
        })
      },
    })
  }

  return { handleApprove, handleReject }
}
