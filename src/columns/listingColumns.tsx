import type { ReactNode } from 'react'
import { ActionIcon, Avatar, Badge, Button, Group, Menu } from '@mantine/core'
import {
  IconCheck,
  IconDotsVertical,
  IconEye,
  IconTrash,
  IconX,
  IconEdit,
} from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
import { perPage } from '@/constant/config'
import { formatDate } from '@/components/utils/helper'
import { formatNumber } from '@/utils/formatters'

export interface ListingItem {
  id: number
  image: string | null
  name: string
  condition: string
  color: string
  category: string
  price: string
  seller_name: string
  seller_image: string
  listing_date: string
  status: string
}

interface ListingColumnsProps {
  page: number
  handleView: (id: Id) => void
  handleDeleteClick?: (id: Id) => void
  handleApprove?: (id: Id) => void
  handleReject?: (id: Id) => void
  buttonLayout?: 'menu' | 'horizontal'
  showActions?: string[]
}

// export const listingColumns = ({
//   page,
//   handleView,
//   handleDeleteClick,
//   handleApprove,
//   handleReject,
//   buttonLayout = 'menu',
//   showActions = ['view', 'edit', 'delete'],
// }: ListingColumnsProps): ColumnDef<ListingItem>[] => [
//   {
//     key: 'sn',
//     header: 'SN',
//     render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
//   },
//   {
//     key: 'image',
//     header: 'Image',
//     render: (listing): ReactNode => <Avatar src={listing.image} size="md" />,
//   },
//   {
//     key: 'name',
//     header: 'Product Name',
//     render: (listing): ReactNode => listing.name,
//   },
//   {
//     key: 'condition',
//     header: 'Condition',
//     render: (listing): ReactNode => listing.condition,
//   },
//   {
//     key: 'color',
//     header: 'Color',
//     render: (listing): ReactNode => listing.color,
//   },
//   {
//     key: 'category',
//     header: 'Category',
//     render: (listing): ReactNode => listing.category,
//   },
//   {
//     key: 'price',
//     header: 'Price',
//     render: (listing): ReactNode => `NGN ${formatNumber(listing.price)}`,
//   },
//   {
//     key: 'seller_image',
//     header: 'Seller Image',
//     render: (listing): ReactNode => (
//       <div className="flex justify-center">
//         <div className="w-9 h-9 flex-shrink-0">
//           <img
//             src={listing.seller_image}
//             alt={listing.seller_name}
//             className="w-full h-full rounded-full object-cover"
//           />
//         </div>
//       </div>
//     ),
//   },
//   {
//     key: 'seller_name',
//     header: 'Seller Name',
//     render: (listing): ReactNode => (
//       <div className="max-w-[180px]">
//         <span
//           title={listing.seller_name}
//           className="truncate text-sm font-medium"
//         >
//           {listing.seller_name}
//         </span>
//       </div>
//     ),
//   },
//   {
//     key: 'listing_date',
//     header: 'Listed On',
//     render: (listing): ReactNode => formatDate(listing.listing_date),
//   },
//   {
//     key: 'status',
//     header: 'Status',
//     render: (listing): ReactNode => (
//       <Badge
//         color={
//           listing.status.toLocaleLowerCase() === 'active' ? '#AD7A22' : 'gray'
//         }
//         variant="light"
//       >
//         <div className="flex items-center gap-2">
//           <div
//             className={`size-2 ${
//               listing.status.toLocaleLowerCase() === 'active'
//                 ? 'bg-yellow-600'
//                 : 'bg-gray-800'
//             } rounded-full`}
//           />
//           {listing.status}
//         </div>
//       </Badge>
//     ),
//   },
//   {
//     key: 'actions',
//     // header: () => (
//     //   <div style={{ textAlign: 'center', width: '100%' }}>Action</div>
//     // ),
//     // header: () => <div className="text-center w-full">Action</div>,
//     header: <div style={{ textAlign: 'center' }}>Action</div>,

//     // header: 'Actions',
//     render: (listing): ReactNode => {
//       if (buttonLayout === 'horizontal') {
//         return (
//           <Group gap={5} wrap="nowrap" justify="center">
//             {showActions.includes('approve') && (
//               <Button
//                 size="compact-xs"
//                 variant="light"
//                 color="green"
//                 leftSection={<IconCheck size={10} />}
//                 onClick={() => handleApprove?.(listing.id)}
//               >
//                 Approve
//               </Button>
//             )}
//             {showActions.includes('reject') && (
//               <Button
//                 size="compact-xs"
//                 variant="light"
//                 color="red"
//                 leftSection={<IconX size={10} />}
//                 onClick={() => handleReject?.(listing.id)}
//               >
//                 Reject
//               </Button>
//             )}
//             {showActions.includes('view') && (
//               <Button
//                 size="compact-xs"
//                 variant="light"
//                 leftSection={<IconEye size={10} />}
//                 onClick={() => handleView(listing.id)}
//               >
//                 View
//               </Button>
//             )}
//             {showActions.includes('edit') && (
//               <Button
//                 size="compact-xs"
//                 variant="light"
//                 leftSection={<IconEdit size={10} />}
//                 onClick={() => handleView(listing.id)}
//               >
//                 Edit
//               </Button>
//             )}
//           </Group>
//         )
//       } else {
//         // Menu layout
//         return (
//           <Menu position="bottom-end" withArrow>
//             <Menu.Target>
//               <ActionIcon variant="subtle" color="gray">
//                 <IconDotsVertical size={18} stroke={2} />
//               </ActionIcon>
//             </Menu.Target>
//             <Menu.Dropdown>
//               {showActions.includes('view') && (
//                 <Menu.Item
//                   leftSection={<IconEye size={16} />}
//                   onClick={() => handleView(listing.id)}
//                 >
//                   View
//                 </Menu.Item>
//               )}
//               {showActions.includes('edit') && (
//                 <Menu.Item
//                   leftSection={<IconEdit size={16} />}
//                   onClick={() => handleView(listing.id)} // You might want a separate edit handler
//                 >
//                   Edit
//                 </Menu.Item>
//               )}
//               {showActions.includes('delete') && handleDeleteClick && (
//                 <Menu.Item
//                   color="red"
//                   leftSection={<IconTrash size={16} />}
//                   onClick={() => handleDeleteClick(listing.id)}
//                 >
//                   Delete
//                 </Menu.Item>
//               )}
//               {showActions.includes('approve') && handleApprove && (
//                 <Menu.Item
//                   leftSection={<IconCheck size={16} />}
//                   color="green"
//                   onClick={() => handleApprove(listing.id)}
//                 >
//                   Approve
//                 </Menu.Item>
//               )}
//               {showActions.includes('reject') && handleReject && (
//                 <Menu.Item
//                   leftSection={<IconX size={16} />}
//                   color="red"
//                   onClick={() => handleReject(listing.id)}
//                 >
//                   Reject
//                 </Menu.Item>
//               )}
//             </Menu.Dropdown>
//           </Menu>
//         )
//       }
//     },
//   },
// ]

export const listingColumns = ({
  page,
  handleView,
  handleDeleteClick,
  handleApprove,
  handleReject,
  buttonLayout = 'menu',
  showActions = ['view', 'edit', 'delete'],
}: ListingColumnsProps): ColumnDef<ListingItem>[] => {
  const columns: ColumnDef<ListingItem>[] = [
    {
      key: 'sn',
      header: 'SN',
      render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
    },
    {
      key: 'image',
      header: 'Image',
      render: (listing): ReactNode => <Avatar src={listing.image} size="md" />,
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (listing): ReactNode => listing.name,
    },
    {
      key: 'condition',
      header: 'Condition',
      render: (listing): ReactNode => listing.condition,
    },
    {
      key: 'color',
      header: 'Color',
      render: (listing): ReactNode => listing.color,
    },
    {
      key: 'category',
      header: 'Category',
      render: (listing): ReactNode => listing.category,
    },
    {
      key: 'price',
      header: 'Price',
      render: (listing): ReactNode => `NGN ${formatNumber(listing.price)}`,
    },
    {
      key: 'seller_image',
      header: 'Seller Image',
      render: (listing): ReactNode => (
        <div className="flex justify-center">
          <div className="w-9 h-9 flex-shrink-0">
            <img
              src={listing.seller_image}
              alt={listing.seller_name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      key: 'seller_name',
      header: 'Seller Name',
      render: (listing): ReactNode => (
        <div className="max-w-[180px]">
          <span
            title={listing.seller_name}
            className="truncate text-sm font-medium"
          >
            {listing.seller_name}
          </span>
        </div>
      ),
    },
    {
      key: 'listing_date',
      header: 'Listed On',
      render: (listing): ReactNode => formatDate(listing.listing_date),
    },
  ]

  // ✅ Only add this separate “Status” column when buttonLayout is 'menu'
  if (buttonLayout === 'menu') {
    columns.push({
      key: 'status',
      header: 'Status',
      render: (listing): ReactNode => (
        <Badge
          color={listing.status.toLowerCase() === 'active' ? '#AD7A22' : 'gray'}
          variant="light"
        >
          <div className="flex items-center gap-2">
            <div
              className={`size-2 ${
                listing.status.toLowerCase() === 'active'
                  ? 'bg-yellow-600'
                  : 'bg-gray-800'
              } rounded-full`}
            />
            {listing.status}
          </div>
        </Badge>
      ),
    })
  }

  columns.push({
    key: 'actions',
    header: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {buttonLayout === 'horizontal' ? 'Status' : 'Action'}
      </div>
    ),
    render: (listing): ReactNode => {
      if (buttonLayout === 'horizontal') {
        return (
          <div className="flex flex-col items-center gap-2">
            {/* <Badge
              color={
                listing.status.toLowerCase() === 'active' ? '#AD7A22' : 'gray'
              }
              variant="light"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`size-2 ${
                    listing.status.toLowerCase() === 'active'
                      ? 'bg-yellow-600'
                      : 'bg-gray-800'
                  } rounded-full`}
                />
                {listing.status}
              </div>
            </Badge> */}

            <Group gap={5} wrap="nowrap" justify="center">
              {showActions.includes('approve') && (
                <Button
                  size="compact-xs"
                  variant="light"
                  color="green"
                  leftSection={<IconCheck size={10} />}
                  onClick={() => handleApprove?.(listing.id)}
                >
                  Approve
                </Button>
              )}
              {showActions.includes('reject') && (
                <Button
                  size="compact-xs"
                  variant="light"
                  color="red"
                  leftSection={<IconX size={10} />}
                  onClick={() => handleReject?.(listing.id)}
                >
                  Reject
                </Button>
              )}
              {showActions.includes('view') && (
                <Button
                  size="compact-xs"
                  variant="light"
                  leftSection={<IconEye size={10} />}
                  onClick={() => handleView(listing.id)}
                >
                  View
                </Button>
              )}
              {showActions.includes('edit') && (
                <Button
                  size="compact-xs"
                  variant="light"
                  leftSection={<IconEdit size={10} />}
                  onClick={() => handleView(listing.id)}
                >
                  Edit
                </Button>
              )}
            </Group>
          </div>
        )
      }

      // ✅ Menu layout (your existing code)
      return (
        <Menu position="bottom-end" withArrow>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical size={18} stroke={2} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {showActions.includes('view') && (
              <Menu.Item
                leftSection={<IconEye size={16} />}
                onClick={() => handleView(listing.id)}
              >
                View
              </Menu.Item>
            )}
            {showActions.includes('edit') && (
              <Menu.Item
                leftSection={<IconEdit size={16} />}
                onClick={() => handleView(listing.id)}
              >
                Edit
              </Menu.Item>
            )}
            {showActions.includes('delete') && handleDeleteClick && (
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={() => handleDeleteClick(listing.id)}
              >
                Delete
              </Menu.Item>
            )}
            {showActions.includes('approve') && handleApprove && (
              <Menu.Item
                leftSection={<IconCheck size={16} />}
                color="green"
                onClick={() => handleApprove(listing.id)}
              >
                Approve
              </Menu.Item>
            )}
            {showActions.includes('reject') && handleReject && (
              <Menu.Item
                leftSection={<IconX size={16} />}
                color="red"
                onClick={() => handleReject(listing.id)}
              >
                Reject
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      )
    },
  })

  return columns
}
