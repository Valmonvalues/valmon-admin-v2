import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react'
import { useAuth } from '@/services/auth.service'
import { notifications } from '@mantine/notifications'
import { Button, PasswordInput, TextInput } from '@mantine/core'

export const Route = createFileRoute('/')({
  component: App,
})

interface UserData {
  email: string
  password: string
}

function App() {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignIn = () => {
    login.mutate(userData, {
      onSuccess: () => {
        navigate({ to: '/summary' })
      },
      onError(error) {
        notifications.show({
          title: 'Login Failed',
          message: `An error occurred during login.`,
          color: 'red',
        })
        console.log(error)
      },
    })
  }
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-1/2">
          <div className="mb-9">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          </div>

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Johndoe@mail.com"
            value={userData.email}
            onChange={handleChange}
            className="mb-6"
            required
            size="md"
            radius={'md'}
          />

          <PasswordInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
            className="mb-6"
            required
            size="md"
            radius={'md'}
          />

          <Button
            loading={login.isLoading}
            loaderProps={{ type: 'bars', color: 'white', size: 'sm' }}
            onClick={handleSignIn}
            className="my-5 background"
            fullWidth
            size="md"
            // color="#8B6914"
            radius={'md'}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}
