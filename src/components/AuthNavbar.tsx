import React from 'react'
import { Link } from '@tanstack/react-router'
import brandLogo from '@/assets/images/Logo/valmon.svg'

const AuthNavBar: React.FC = () => {
  return (
    <nav
      className="bg-stone-950 w-full fixed z-50"
      style={{ fontFamily: 'satoshiB' }}
    >
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              // Add onClick handler to toggle mobile menu here if needed
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon when menu is open - toggle visibility via state */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div className="flex flex-shrink-0 items-center">
              <img className="w-auto" src={brandLogo} alt="Valmon Brand Logo" />
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center justify-end flex-1 space-x-4">
            {/* Uncomment and add search logic if needed */}
            {/*
            <div className="w-1/4 rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-stone-900">
              <label className="h-10 input input-bordered flex items-center gap-2 bg-inherit search">
                <img src={magnifyLens} alt="magnifying Lens" />
                <input
                  type="text"
                  className="text-sm text-[#FFFFFF80]"
                  placeholder="Search For Services"
                />
              </label>
            </div>
            */}

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 font-medium text-white hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Explore Skills
                </Link>
                <Link
                  to="/marketplace"
                  className="rounded-md px-3 py-2 font-medium text-white hover:bg-gray-700 hover:text-white"
                >
                  MarketPlace
                </Link>
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 font-medium text-white hover:bg-gray-700 hover:text-white"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Join Now Button */}
            <Link to="/getstarted">
              <button className="btn btn-outline bg-inherit text-white  hover:bg-gray-700 hover:text-white">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu (render conditionally if you add state for toggle) */}
    </nav>
  )
}

export default AuthNavBar
