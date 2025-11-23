import { allowedRoles } from '@/data/roles'
import {
  IconBuildingStore,
  IconCalendarDot,
  IconCirclePlus,
  IconCoin,
  IconLayout2,
  IconMessageUser,
  IconPaint,
  IconSettings,
  IconUser,
} from '@tabler/icons-react'

export const navLinks = [
  {
    label: 'Summary',
    icon: <IconLayout2 />,
    route: '/summary',
    allowedRoles: allowedRoles.summary,
  },
  {
    label: 'Manage User',
    icon: <IconUser />,
    route: '/users',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.users,
  },
  {
    label: 'Skills',
    icon: <IconPaint />,
    route: '/skills',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.skills,
  },
  {
    label: 'Market Place',
    icon: <IconBuildingStore />,
    route: '/marketPlace',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.marketPlace,
  },
  {
    label: 'Valmon Wallet',
    icon: <IconCoin />,
    route: '/wallet',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.wallet,
  },
  {
    label: 'Conflict Resolution',
    icon: <IconCalendarDot />,
    route: '/resolution',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.resolution,
  },
  {
    label: 'Category Request',
    icon: <IconCirclePlus />,
    route: '/categoryRequest',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.categoryRequest,
  },
  {
    label: 'Settings',
    icon: <IconSettings />,
    route: '/settings',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.settings,
  },
  {
    label: 'Account Managers',
    icon: <IconMessageUser />,
    route: '/account',
    // allowedRoles: ['user'],
    allowedRoles: allowedRoles.account,
  },
]
