import { useUser } from '@/services/user.service'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(dashboard)/profile/')({
  component: Profile,
})

function Profile() {
  const [userInfo, setUserInfo] = useState('')
  const [adminUsers, setAdminUsers] = useState('')
  const [loading, setLoading] = useState(false)
  const [galleryLoader, setGalleryLoader] = useState(false)

  const [isOnline, setIsOnline] = useState(false)

  const role = 'Admin'

  const { getUser } = useUser()

  //   const { data: user, isLoading: userLoader } = getUser()

  return (
    <div className="">
      <div>Hello "/profile/"!</div>

      <div
        className={`flex gap-8 pb-20 xxl:px-20 relative pt-5 ${
          role === 'Admin' || role === 'super_admin' ? 'flex-col' : ''
        }`}
      >
        {/* Back button for admin */}
        {(role === 'Admin' || role === 'super_admin') && (
          <button
            // onClick={backToAdmin}
            className="absolute top-15 left-[-10px]"
          >
            {/* <BaseBackButton /> */}
          </button>
        )}

        {/* Admin Dashboard View */}
        {role === 'Admin' || role === 'super_admin' ? (
          <aside className="xl:w-3/4">
            <div className="card card-compact bg-base-100 shadow-xl mx-auto">
              <div className="card-body flex-row gap-20">
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-6 mb-2 flex-1">
                      <div className="avatar">
                        <div className="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                          {/* <img
                            src={adminUsers?.profile_pic || ''}
                            alt="avatar"
                          /> */}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-1 text-[#24242A] font-semibold text-sm">
                          {/* {adminUsers?.first_name} {adminUsers?.last_name} */}
                          Oluwa Dunsin
                        </h3>
                        <div className="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
                          {/* {adminUsers?.profile?.services?.[0]?.service?.name ??
                            'N/A'} */}
                          N/A
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rating w-4">
                            <input
                              type="radio"
                              name="rating-1"
                              className="mask mask-star"
                            />
                          </div>
                          <span className="text-xs font-bold">
                            {/* {adminUsers?.rating} */}
                          </span>
                          <span className="text-black text-xs">
                            {/* ({adminUsers?.ratings_count} Ratings) */}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1">
                        {/* <img
                          src={location}
                          alt="location icon"
                          className="h-5"
                        /> */}
                        {/* <span className="font-medium text-[rgba(0,0,0,1)]">
                          {
                            adminUsers?.profile?.addresses?.[
                              adminUsers.profile.addresses.length - 1
                            ]?.city
                          }
                          ,{' '}
                          {
                            adminUsers?.profile?.addresses?.[
                              adminUsers.profile.addresses.length - 1
                            ]?.country
                          }
                        </span> */}
                      </div>
                      <div className="flex gap-2 items-center text-[#62646A] text-xs mb-1">
                        {/* <img
                          src={copySuccess}
                          alt="copy icon"
                          className="h-5"
                        /> */}
                        <span className="text-[rgba(0,0,0,1)] font-medium">
                          {/* {adminUsers?.active_jobs_count} jobs Completed */}
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

                  <div>
                    <div className="card-actions justify-between gap-4">
                      <a
                        // href={`mailto:${adminUsers?.email}`}
                        className="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
                      >
                        Contact
                      </a>
                      <button
                        className="btn bg-[#FF9F12CC] flex-1 rounded-2xl border-[#FF9F12CC] border-2"
                        // onClick={() =>
                        //   manageUser(adminUsers.id, adminUsers.account_status)
                        // }
                      >
                        {/* {adminUsers.account_status === 'ACTIVE'
                          ? 'Deactivate'
                          : 'Activate'} */}
                        Activate
                      </button>
                      <button
                        className="btn bg-red-600 flex-1 text-white rounded-2xl border-red-600 border-2"
                        // onClick={() => removeUser(adminUsers.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="alert mb-2 block flex-1">
                  <h3 className="font-bold mb-2">About Me</h3>
                  {/* <p className="text-xs">{adminUsers?.profile?.bio || 'N/A'}</p> */}
                </div>
              </div>
            </div>
          </aside>
        ) : (
          // Non-admin / general view
          <aside className="">
            <div className="card card-compact bg-base-100 sm:w-3/4 lg:w-72 shadow-xl mx-auto">
              <div className="card-body">
                <div className="card-header mb-1 flex items-center justify-between">
                  <button
                    className="w-fit bg-gray-400 p-1 center rounded-full"
                    // onClick={() => navigate({ to: '/home' }) /* History */}
                  >
                    {/* Back arrow SVG or icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* <div className="flex items-center gap-2 justify-center">
                    <img
                      src={heart}
                      alt="heart icon"
                      className="h-7 cursor-pointer"
                      //   onClick={() => addToFavorite(userInfo?.id ?? '')}
                    />
                    <img src={send} alt="send icon" className="h-7" />
                  </div> */}
                </div>
                <div className="flex items-center gap-6 mb-2">
                  <div className="avatar align-self-start">
                    <div className="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                      {/* <img src={userInfo?.profile_pic ?? ''} alt="avatar" /> */}
                    </div>
                  </div>
                  <div className="w-full">
                    {/* <h3 className="mb-1 text-[#24242A] font-semibold text-sm">
                      {userInfo?.first_name} {userInfo?.last_name}
                    </h3> */}
                    {/* <div className="flex items-center flex-wrap gap-2 my-2">
                      {userInfo?.profile?.services?.map((service, idx) => (
                        <div
                          key={idx}
                          className="text-xs py-1 px-2 bg-gray-200 tag rounded-sm w-fit"
                        >
                          {service.service?.name}
                        </div>
                      ))}
                    </div> */}
                    <div className="flex items-center gap-2">
                      <div className="rating w-4">
                        <input
                          type="radio"
                          name="rating-1"
                          className="mask mask-star"
                        />
                      </div>
                      {/* <span className="text-xs font-bold">
                        {userInfo?.rating}
                      </span> */}
                      {/* <span className="text-black text-xs">
                        ({userInfo?.ratings_count} Ratings)
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="alert mb-2 block">
                  <h3 className="font-bold mb-2">About Me</h3>
                  {/* <p className="text-xs">{userInfo?.profile?.bio || 'Nil'}</p> */}
                </div>
                <div className="flex justify-between items-center text-[#404145] text-xs mb-1">
                  <span className="font-medium">Inbox response time</span>
                  {/* <span className="font-bold">
                    {userInfo?.inbox_response_time} Mins
                  </span> */}
                </div>
                <div className="flex justify-between items-center text-[#404145] text-xs mb-1">
                  <span className="font-medium">Inbox response rate</span>
                  {/* <span className="font-bold">
                    {userInfo?.inbox_response_rate} %
                  </span> */}
                </div>
                <div className="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1">
                  {/* <img src={location} alt="location" className="h-5" /> */}
                  {/* <span className="font-medium">
                    {
                      userInfo?.profile?.addresses?.[
                        userInfo.profile.addresses.length - 1
                      ]?.city
                    }
                    ,{' '}
                    {
                      userInfo?.profile?.addresses?.[
                        userInfo.profile.addresses.length - 1
                      ]?.country
                    }
                  </span> */}
                </div>
                <div className="flex gap-2 items-center text-[#62646A] text-xs mb-1">
                  {/* <img src={copySuccess} alt="copy success" className="h-5" /> */}
                  {/* <span className="font-medium">
                    {userInfo?.profile?.completed_jobs} jobs Completed
                  </span> */}
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
                          cx={9}
                          cy={9}
                          r={9}
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
                        <circle cx={4.5} cy={5} r={4.5} fill="#0CA408" />
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
                          cx={9}
                          cy={9}
                          r={9}
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
                        <circle cx={4.5} cy={5} r={4.5} fill="#FF0000" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}

        <section className="flex-1">
          {/* Tab Navigation */}
          <div className="flex bg-white p-3 rounded-xl lg:w-3/4 xl:w-1/2 items-center gap-4 sm:gap-0 justify-center sm:justify-evenly mb-6">
            {(
              [
                'profile',
                'gallery',
                'service',
                'review',
                'marketplace',
              ] as const
            ).map((tab) => (
              <button key={tab} className=""></button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
