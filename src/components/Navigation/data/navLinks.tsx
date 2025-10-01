import {
  IconBuildingStore,
  IconCalendarDot,
  IconCoin,
  IconLayout2,
  IconLogout,
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
  },
  {
    label: 'Manage User',
    icon: <IconUser />,
    route: '/users',
  },
  {
    label: 'Skills',
    icon: <IconPaint />,
    route: '/skills',
  },
  {
    label: 'Market Place',
    icon: <IconBuildingStore />,
    route: '/marketPlace',
  },
  {
    label: 'Valmon Wallet',
    icon: <IconCoin />,
    route: '/wallet',
  },
  {
    label: 'Conflict Resolution',
    icon: <IconCalendarDot />,
    route: '/resolution',
  },
  {
    label: 'Settings',
    icon: <IconSettings />,
    route: '/settings',
  },
  {
    label: 'Account Managers',
    icon: <IconMessageUser />,
    route: '/account',
  },
  {
    label: 'Logout',
    icon: <IconLogout />,
    route: '/logout',
  },
]
