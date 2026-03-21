import { Text } from '@mantine/core'

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-40 bg-white p-5 rounded-xl mb-6">
      <Text ta="center" c="dimmed">
        {message}
      </Text>
    </div>
  )
}

export default EmptyState
