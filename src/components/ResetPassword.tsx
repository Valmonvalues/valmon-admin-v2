import { Box, Button, Center, Loader, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSettings } from '@/services/settings.service'
import { storage } from '@/constant/config'
import { useNavigate } from '@tanstack/react-router'
import type { ResetPasswordForm } from '@/types/settings.types'

function ResetPassword() {
  const navigate = useNavigate()
  const { resetPassword } = useSettings()
  const { mutate: changePassword, isPending: resetting } = resetPassword

  const form = useForm({
    // mode: 'uncontrolled',
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    validate: {
      current_password: (value) =>
        value.length < 6
          ? 'Current password must be at least 6 characters'
          : null,

      password: (value) =>
        value.length < 6 ? 'New password must be at least 6 characters' : null,

      password_confirmation: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  })

  const handleResetPassword = (values: ResetPasswordForm) => {
    changePassword(values, {
      onSuccess: () => {
        form.reset()
        storage.removeItem('valmon_adminToken')
        // window.history.navigate({ to: '/' })
        navigate({ to: '/', replace: true })
      },
    })
  }

  return (
    <Box
      className="w-full"
      p="xl"
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      }}
    >
      {resetting ? (
        <Center style={{ height: 200 }}>
          <Loader color="gold" size="lg" />
        </Center>
      ) : (
        <form onSubmit={form.onSubmit(handleResetPassword)}>
          <PasswordInput
            label="Current Password"
            {...form.getInputProps('current_password')}
            required
            mt="sm"
            size="sm"
          />
          <PasswordInput
            label="New Password"
            {...form.getInputProps('password')}
            required
            mt="sm"
            size="sm"
          />
          <PasswordInput
            label="Confirm Password"
            {...form.getInputProps('password_confirmation')}
            required
            mt="sm"
            size="sm"
          />
          <Button
            loading={resetting}
            type="submit"
            fullWidth
            mt="md"
            color="dark"
          >
            Reset Password
          </Button>
        </form>
      )}
    </Box>
  )
}

export default ResetPassword
