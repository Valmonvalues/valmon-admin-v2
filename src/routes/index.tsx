import { createFileRoute, Link } from '@tanstack/react-router'

import React, { useState, type ChangeEvent } from 'react'
import googleIcon from '@/assets/icons/google.svg'
import AuthLayout from '@/layout/AuthLayout'
import BaseButton from '@/components/BaseButton'

export const Route = createFileRoute('/')({
  component: App,
})

// TypeScript interfaces
interface UserData {
  email: string
  password: string
}

interface BaseInputProps {
  label: string
  type?: string
  placeholder?: string
  name: keyof UserData
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

// Reusable Input Component
const BaseInput: React.FC<BaseInputProps> = ({
  label,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  className,
}) => (
  <div className={className}>
    <label className="block text-base font-medium text-gray-800 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-darkGold"
    />
  </div>
)

function App() {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => setLoading(false), 2000)
  }
  return (
    <AuthLayout>
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="w-1/2">
            {/* Heading */}
            <div className="mb-9">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-lg text-gray-600">
                Please login to continue to your account.
              </p>
            </div>

            {/* Email Input */}
            <BaseInput
              label="Email"
              name="email"
              type="email"
              placeholder="Johndoe@email.com"
              value={userData.email}
              onChange={handleChange}
              className="mb-6"
            />

            {/* Password Input */}
            <BaseInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
            />

            {/* Sign In Button */}
            <BaseButton
              loading={loading}
              title="Sign In"
              color="#8B6914"
              textColor="rgba(255, 255, 255, 1)"
              onClick={handleSignIn}
              outline={false}
              className="my-5"
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
