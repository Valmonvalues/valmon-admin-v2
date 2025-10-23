import { useEffect, useState } from 'react'
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  FileInput,
  Button,
  Group,
  Radio,
  Select,
} from '@mantine/core'

export interface Field {
  name: string
  label: string
  type: 'text' | 'textarea' | 'email' | 'radio' | 'select' | 'file'
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface AddModalProps {
  title: string
  fields: Field[]
  opened: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => void
  loading?: boolean
  submitLabel?: string
}

const AddModal = ({
  opened,
  onClose,
  title,
  fields,
  onSubmit,
  loading = false,
  submitLabel = 'Save',
}: AddModalProps) => {
  //   const formData: Record<string, any> = {};
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!opened) {
      setFormData({})
    }
  }, [opened])

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (value instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(value)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    // onClose()
    // setFormData({})
  }

  useEffect(() => {
    if (!opened) {
      setFormData((prev) => {
        const newData = { ...prev }
        delete newData[fileField?.name as string]
        return newData
      })
      setImagePreview(null)
    }
  }, [opened])

  const fileField = fields.find((f) => f.type === 'file')
  const otherFields = fields.filter((f) => f.type !== 'file')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div className="text-lg font-semibold text-[#7E7BA9]">{title}</div>
      }
      centered
      overlayProps={{
        backgroundOpacity: 0.25,
        blur: 4,
      }}
      classNames={{
        content: 'rounded-2xl p-6',
        header: 'mb-3',
      }}
    >
      <div className="flex flex-col gap-4">
        {/* {fileField && (
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-32 h-32">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-sm border border-gray-300">
                  No Image
                </div>
              )}
            </div>
            <FileInput
              key={fileField.name}
              label={fileField.label}
              placeholder="Upload image"
              value={formData[fileField.name] || null}
              onChange={(file) => handleChange(fileField.name, file)}
              radius="md"
              className="mt-2"
            />{' '}
          </div>
        )} */}

        {fileField && (
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="upload-image" className="cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-sm border border-gray-300">
                  Upload Image
                </div>
              )}
            </label>

            <FileInput
              id="upload-image"
              style={{ display: 'none' }}
              onChange={(file) => handleChange(fileField.name, file)}
              radius="md"
              className="mt-2"
            />
          </div>
        )}

        {otherFields.map((field) => {
          if (field.type === 'text' || field.type === 'email') {
            return (
              <TextInput
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                radius="md"
                size="md"
                classNames={{
                  label: 'text-[#7E7BA9] font-medium mb-1',
                  input:
                    'focus:border-[#7E7BA9] focus:ring-[#7E7BA9] rounded-md',
                }}
              />
            )
          }

          if (field.type === 'textarea') {
            return (
              <Textarea
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                radius="md"
                autosize
                minRows={3}
                classNames={{
                  label: 'text-[#7E7BA9] font-medium mb-1',
                  input:
                    'focus:border-[#7E7BA9] focus:ring-[#7E7BA9] rounded-md',
                }}
              />
            )
          }
          if (field.type === 'file') {
            return (
              <FileInput
                key={field.name}
                label={field.label}
                placeholder="No file chosen"
                value={formData[field.name] || null}
                onChange={(file) => handleChange(field.name, file)}
                radius="md"
                classNames={{
                  label: 'text-[#7E7BA9] font-medium mb-1',
                  input: 'rounded-md border border-gray-300',
                }}
              />
            )
          }
          if (field.type === 'radio') {
            return (
              <Radio.Group
                key={field.name}
                label={field.label}
                value={formData[field.name] || ''}
                onChange={(value) => handleChange(field.name, value)}
                classNames={{
                  label: 'text-[#7E7BA9] font-medium mb-1',
                }}
              >
                <Stack gap="xs">
                  {field.options?.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </Stack>
              </Radio.Group>
            )
          }
          if (field.type === 'select') {
            return (
              <Select
                key={field.name}
                label={field.label}
                data={
                  field.options?.map(({ label, value }) => ({
                    label,
                    value,
                  })) || []
                }
                value={formData[field.name] || ''}
                onChange={(value) => handleChange(field.name, value)}
                classNames={{
                  label: 'text-[#7E7BA9] font-medium mb-1',
                }}
                radius="md"
              />
            )
          }

          return null
        })}

        <Group justify="center" mt="md" gap="md">
          <Button
            onClick={handleSubmit}
            loading={loading}
            radius="md"
            size="md"
            fullWidth
            variant="filled"
            color="dark"
            // className="bg-black text-white hover:bg-gray-800"
          >
            {submitLabel}
            {/* Save */}
          </Button>
          {/* <Button
            variant="default"
            radius="md"
            size="md"
            onClick={onClose}
            className="text-gray-700"
          >
            Close
          </Button> */}
        </Group>
      </div>
    </Modal>
  )
}

export default AddModal
