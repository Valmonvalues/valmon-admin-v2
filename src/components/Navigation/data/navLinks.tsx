import {
  IconBuildingStore,
  IconCalendarDot,
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
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Manage User',
    icon: <IconUser />,
    route: '/users',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Skills',
    icon: <IconPaint />,
    route: '/skills',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Market Place',
    icon: <IconBuildingStore />,
    route: '/marketPlace',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Valmon Wallet',
    icon: <IconCoin />,
    route: '/wallet',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Conflict Resolution',
    icon: <IconCalendarDot />,
    route: '/resolution',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Settings',
    icon: <IconSettings />,
    route: '/settings',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
  {
    label: 'Account Managers',
    icon: <IconMessageUser />,
    route: '/account',
    // allowedRoles: ['user'],
    allowedRoles: ['super_admin'],
  },
]
