import React, { useState } from 'react'

import { Link, useNavigate } from '@tanstack/react-router'
import { navLinks } from './data/navLinks'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { useGlobalStore } from '@/store'

type Props = {
  className?: string
}

const SideNavigation: React.FC<Props> = ({ className }) => {
  const [activeMenu, setActiveMenu] = useState<'summary' | 'user' | 'skills'>(
    'summary',
  )
  //   const store = useGlobalStore()
  const navigate = useNavigate()

  //   const activeMenu = store.activeSideMenu
  const pathColor = '#A3A3A8'
  const activePathColor = '#232222'

  const changeActiveMenu = (menu: string) => {
    if (menu === 'logout') {
      //   store.$patch({ Admin: null })
      navigate({ to: '/' })
    } else {
      //   store.$patch({
      //     activeSideMenu: menu,
      //     viewParentSubCategory: false,
      //   })
    }
  }

  return (
    <div className={`bg-[#232222] text-white relative px-3 py-20 ${className}`}>
      {navLinks.map((navlink) => {
        return (
          <Link
            to="/summary"
            onClick={() => changeActiveMenu('summary')}
            className={`flex items-center gap-4 font-medium p-4 mb-6 ${
              activeMenu === 'summary' ? 'activeMenu' : ''
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M1.88892 12.2234C1.88892 11.2606 1.88892 10.7792..."
                stroke={activeMenu === 'summary' ? activePathColor : pathColor}
                strokeWidth="1.25"
              />
            </svg>
            <span>Summary</span>
          </Link>
        )
      })}
    </div>
  )
}

export default SideNavigation
