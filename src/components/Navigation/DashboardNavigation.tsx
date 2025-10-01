import { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
import brandLogo from '@/assets/images/Logo/valmon.svg'
import bell from '@/assets/icons/notification-bing.svg'
import { Link, useLocation } from '@tanstack/react-router'
// import { useGlobalStore } from '@/store'

const DashboardNavigation: React.FC = () => {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState<any[]>([])
  const location = useLocation()
  //   const store = useGlobalStore()

  // Simulated API call (replace with your actual service)
  const fetchUnreadNotifications = async () => {
    try {
      // Example: const { data } = await getUnreadNotifications();
      const data = [{ id: 1, message: 'New user registered' }]
      setUnreadNotifications(data)
    } catch (err) {
      console.error('Fetch unread notifications failed:', err)
    }
  }

  //   useEffect(() => {
  //     if (store.UserAccount) {
  //       fetchUnreadNotifications()
  //     }
  //   }, [store.UserAccount])

  const getRouteName = () => {
    const parts = location.pathname.split('-')
    if (parts.length > 1) {
      return parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
    }
    return ''
  }

  return (
    <nav
      className="bg-stone-950 fixed w-full z-[1000]"
      style={{ fontFamily: 'satoshiB' }}
    >
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <img className="w-auto" src={brandLogo} alt="Valmon Brand Logo" />
            </Link>
          </div>
          <span className="text-white ms-10 font-bold">{getRouteName()}</span>

          {/* Right Section */}
          <div className="flex items-center justify-end flex-1 space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <img src={bell} alt="bell icon" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-600 text-white font-semibold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b font-semibold text-gray-700 bg-gray-50">
                    Unread Notifications
                  </div>
                  <ul className="divide-y max-h-72 overflow-y-auto">
                    {unreadNotifications.map((note) => (
                      <li
                        key={note.id}
                        className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition"
                      >
                        {note.message}
                      </li>
                    ))}
                    {unreadNotifications.length === 0 && (
                      <li className="px-4 py-5 text-center text-gray-500 text-sm">
                        No unread notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link to="/profilesetting">
              <div className="relative ml-3">
                <button
                  id="user-menu-button"
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={'store.UserAccount?.profile_pic'}
                    alt=""
                  />
                </button>
              </div>
            </Link>

            {/* Name + Role */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-1">
                <span className="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
                  {'store.UserAccount?.name'}
                </span>
                <span className="font-normal rounded-3xl bg-[#E1CD7182] pt-2 px-4 text-white">
                  {/* {store.UserAccount?.role === 'super_admin'
                    ? 'Super Admin'
                    : 'admin'} */}
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavigation
