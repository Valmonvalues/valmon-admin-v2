import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useUser } from '@/services/user.service'
import DashboardLayout from '@/layout/DashboardLayout'
import {
  IconArrowLeft,
  IconCopy,
  IconMapPin,
  IconStarFilled,
} from '@tabler/icons-react'
import { Avatar } from '@mantine/core'
import CarouselSection from '@/components/user/CarouselSection'
import ServicesSection from '@/components/user/ServiceSection'
import ReviewsSection from '@/components/user/ReviewSection'

export const Route = createFileRoute('/(dashboard)/users/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOnline] = useState(false)
  const [activeTab, setActiveTab] = useState('Profile Brief')
  const router = useNavigate()
  const { getUser } = useUser()
  const { userId } = Route.useParams()
  const { data: user } = getUser(userId)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile Brief':
        return (
          <>
            <CarouselSection />
            <ServicesSection />
            <ReviewsSection />
          </>
        )
      case 'Work Gallery':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            Work Gallery Content Here
          </div>
        )
      case 'Services':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            Services Content Here
          </div>
        )
      case 'Reviews':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            Reviews Content Here
          </div>
        )
      case 'Market Place Listings':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            Market Place Listings Content Here
          </div>
        )
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="flex gap-3 items-start">
        <div
          className="size-8 flex items-center justify-center rounded-full bg-white"
          onClick={() => router({ to: '..' })}
        >
          <IconArrowLeft className="h-6 w-6" />
        </div>
        <div className="max-w-7xl">
          <aside className="rounded-xl bg-white shadow-sm ">
            <div className="card-body flex-row gap-20">
              <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 mb-2 flex-1">
                    <Avatar src={user?.profile_pic} size={'lg'} />
                    <div>
                      <h3 className="mb-1 text-[#24242A] font-semibold text-sm">
                        {user?.first_name} {user?.last_name}
                      </h3>
                      <div className="text-xs py-1 px-2 bg-gray-200 inline-block rounded-sm mb-2">
                        {user?.profile?.services?.[0]?.service?.name ?? 'N/A'}
                      </div>
                      <div className="flex items-center gap-2">
                        <IconStarFilled className="h-4 w-4 text-black" />
                        <span className="text-xs font-bold">
                          {user?.rating}
                        </span>
                        <span className="text-black text-xs">
                          ({user?.ratings_count} Ratings)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-2 items-center text-[#62646A] text-xs w-1/2">
                      <IconMapPin className="h-4 w-4" />
                      <span className="font-medium text-[rgba(0,0,0,1)]">
                        {user?.profile?.location || 'N/A'}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-[#62646A] text-xs my-2.5">
                      <IconCopy className="h-4 w-4" />
                      <span className="text-[rgba(0,0,0,1)] font-medium">
                        {user?.active_jobs_count} jobs Completed
                      </span>
                    </div>
                    <div className="relative flex gap-2">
                      {isOnline ? (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              opacity={0.2}
                              cx="9"
                              cy="9"
                              r="9"
                              fill="#0CA408"
                            />
                          </svg>
                          <svg
                            className="absolute top-[4px] left-[5px]"
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4.5" cy="5" r="4.5" fill="#0CA408" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              opacity={0.2}
                              cx="9"
                              cy="9"
                              r="9"
                              fill="#FF0000"
                            />
                          </svg>
                          <svg
                            className="absolute top-[4px] left-[5px]"
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4.5" cy="5" r="4.5" fill="#FF0000" />
                          </svg>
                        </>
                      )}
                      <span
                        className={`text-sm font-bold ${
                          isOnline ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-between gap-4 mt-3">
                  <a
                    href={`mailto:${user?.email}`}
                    className="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
                  >
                    Contact
                  </a>
                  <button
                    className="btn bg-[#FFB241] flex-1 rounded-2xl border-[#FF9F12CC] border-2"
                    // onClick={() =>
                    //   manageUser(adminUsers.id, adminUsers.account_status)
                    // }
                  >
                    {user?.account_status === 'ACTIVE'
                      ? 'Deactivate'
                      : 'Activate'}
                  </button>
                  <button
                    className="btn bg-red-600 flex-1 text-white rounded-2xl border-red-600 border-2"
                    // onClick={() => removeUser(adminUsers.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg mb-2 block flex-1 bg-gray-100">
                <h3 className="font-bold mb-2">About Me</h3>
                <p className="text-xs">{user?.profile?.bio || 'N/A'}</p>
              </div>
            </div>
          </aside>

          <section className="flex-1 mt-7 max-w-7xl">
            <div className="flex-wrap inline-block bg-white py-3 px-5 rounded-xl items-center gap-4 md:gap-6 mb-6 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`
                border-b-2 pb-1.5 pt-0.5 text-sm mr-7 font-semibold whitespace-nowrap
                ${
                  activeTab === tab
                    ? 'text-yellow-800 border-yellow-800'
                    : 'text-gray-700 border-transparent hover:border-gray-300'
                } 
                transition-all ease-in-out duration-200 focus:outline-none
              `}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {renderTabContent()}
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

const tabs = [
  'Profile Brief',
  'Work Gallery',
  'Services',
  'Reviews',
  'Market Place Listings',
]
