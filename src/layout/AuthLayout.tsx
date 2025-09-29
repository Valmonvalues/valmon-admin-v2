import AuthNavBar from '@/components/AuthNavbar'
import Footer from '@/components/Footer'
import React, { type ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <AuthNavBar />
      </div>

      {/* Mobile Navigation */}
      {/* <div className="flex lg:hidden">
        <NavigationMobileLanding />
      </div> */}

      {/* Main content area with padding top on large screens */}
      {/* <div className="lg:pt-[6rem] bg-black"> */}
      <>{children}</>
      {/* </div> */}

      <Footer />
    </div>
  )
}

export default AuthLayout
