import { useEffect, useState } from 'react'
import { Modal, Textarea, Button } from '@mantine/core'

interface Props {
  opened: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
  isSubmitting?: boolean
}

const RejectionModal = ({
  opened,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) => {
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (opened) {
      setReason('')
    }
  }, [opened])

  const handleDone = () => {
    onSubmit(reason)
    // setReason('')
  }

  const handleClose = () => {
    setReason('')
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      withCloseButton={false}
      size="lg"
      p="xl"
      classNames={{
        content: 'rounded-5xl p-6 bg-white shadow-md max-w-xl w-full',
      }}
      styles={{
        content: {
          borderRadius: '16px',
          padding: '20px',
          border: '2px solid #1d1d1d',
          outline: 'none',
          //   height: '300px',
        },
      }}
    >
      <div className="flex flex-col gap-5 w-full">
        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Reason For Rejection
        </h2>

        {/* Label + Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">
            Why cant this category be added?
          </label>

          <Textarea
            autosize={false}
            // minRows={15}
            value={reason}
            onChange={(e) => setReason(e.currentTarget.value)}
            classNames={{
              input:
                'border rounded-xl p-3 text-base text-gray-800 bg-white focus:ring-0 focus:border-gray-400 h-[300px]',
            }}
            styles={{
              input: {
                height: '300px',
              },
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2 w-full">
          <Button
            variant="outline"
            color="red"
            w={50}
            className="flex-1 w-[50%] border-2 font-medium rounded-xl"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            color="black"
            className="flex-1 w-[50%] bg-black text-white font-medium rounded-xl hover:bg-gray-900"
            onClick={handleDone}
            loading={isSubmitting}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RejectionModal
