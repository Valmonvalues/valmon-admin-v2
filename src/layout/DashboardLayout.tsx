import { navLinks } from '@/components/Navigation/data/navLinks'
import { AppShell, Avatar, ScrollArea, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, useLocation } from '@tanstack/react-router'

import brandLogo from '@/assets/images/Logo/valmon.svg'
import bell from '@/assets/icons/notification-bing.svg'
import { useState, type ReactNode } from 'react'
import { IconLogout } from '@tabler/icons-react'
import { storage } from '@/constant/config'
import { useUser } from '@/services/user.service'
import Notifications from './Notifications'
import { useNotifications } from '@/services/notifications.service'
import {
  AccessManagementRoleProvider,
  useAccessManagementRoleContext,
} from '@/contexts/AccessManagementRole'
import { useRolePermissions } from '@/services/rolePermissions.service'

type LayoutProps = {
  children: ReactNode
}

/**
 * 🔹 Root Layout (ONLY wraps with provider)
 */
const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <DashboardWithAccess>
      <DashboardContent>{children}</DashboardContent>
    </DashboardWithAccess>
  )
}

export default DashboardLayout

/**
 * 🔹 Provider Wrapper (handles fetching + role → permissions)
 */
const DashboardWithAccess = ({ children }: { children: ReactNode }) => {
  const { getMe } = useUser()
  const { data: me } = getMe()

  const { data: roles } = useRolePermissions().getAllRoles()

  // ⛔ Prevent rendering until data is ready
  if (!me || !roles) return null

  const normalizedUserRole = me.role?.toLowerCase()

  const userRolePerm =
    roles.find(
      (role) =>
        role.name.split(' ').join('_').toLowerCase() === normalizedUserRole,
    )?.permissions ?? []

  return (
    <AccessManagementRoleProvider permissions={userRolePerm}>
      {children}
    </AccessManagementRoleProvider>
  )
}

/**
 * 🔹 Actual Layout Content (SAFE to use context here)
 */
const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { canAccess, canAccessAny } = useAccessManagementRoleContext()

  const [opened, { toggle }] = useDisclosure()
  const [notificationOpen, setNotificationOpen] = useState(false)

  const { getMe } = useUser()
  const { data: me } = getMe()

  const { allNotifications } = useNotifications()
  const { data: notifications } = allNotifications()

  const { pathname } = useLocation()

  const getRouteName = () => {
    const routeName = pathname.split('-')
    if (routeName.length > 1) {
      return routeName[1].charAt(0).toUpperCase() + routeName[1].slice(1)
    }
    return ''
  }

  const handleLogout = () => {
    storage.removeItem('valmon_adminToken')
    window.location.replace('/')
  }

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 240 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      bg="var(--color-bg-primary)"
    >
      {/* HEADER */}
      <AppShell.Header>
        <nav className="bg-stone-950 w-full h-[101%] flex items-center px-4">
          {/* Left */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />

            <Link to="/summary" className="flex items-center">
              <img src={brandLogo} alt="Valmon Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Route Name */}
          <div className="text-white font-semibold ms-4 hidden sm:block truncate max-w-[150px]">
            {getRouteName()}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <img src={bell} alt="bell icon" className="h-5 w-5" />

                {notifications && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-600 text-white font-semibold rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 z-50">
                  <Notifications />
                </div>
              )}
            </div>

            {/* Avatar */}
            <button className="rounded-full bg-gray-800 p-[2px]">
              <Avatar src={''} size="sm" />
            </button>

            {/* User Info */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="font-medium text-white">{me?.name}</span>
              <div className="px-2 py-1 rounded-2xl bg-[#E1CD7182] text-white text-xs">
                {me?.role || 'User'}
              </div>
            </div>
          </div>
        </nav>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar
        px="md"
        py="xl"
        bg="var(--color-layout)"
        className="overflow-y-auto"
      >
        <AppShell.Section grow component={ScrollArea} scrollbarSize={4}>
          {navLinks
            .filter((nav) => canAccessAny(nav.requiredPermissions))
            .map((navlink, idx) => (
              <Link
                key={idx}
                to={navlink.route}
                className={`
                  flex items-center gap-4 font-medium p-3 mb-3 rounded
                  hover:bg-gray-800 transition 
                  text-white
                  ${navlink.route === '/settings' ? 'border-t pt-4' : ''}
                `}
                activeProps={{
                  className: 'activeMenu text-white bg-gray-800 rounded',
                }}
              >
                {navlink.icon}
                <span>{navlink.label}</span>
              </Link>
            ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 font-medium p-3 mt-4 text-red-500"
          >
            <IconLogout />
            <span>Logout</span>
          </button>
        </AppShell.Section>
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main className="p-3 sm:p-6">{children}</AppShell.Main>
    </AppShell>
  )
}
