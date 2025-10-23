import { useState } from 'react'
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  FileInput,
  Button,
  Group,
  Text,
  Divider,
} from '@mantine/core'

export interface ParentCategory {
  id: number
  name: string
  description?: string
  image?: File | string
}

export interface AddParentCategoryModalProps {
  opened: boolean
  onClose: () => void
  onSubmit: (category: Omit<ParentCategory, 'id'>) => void
  existingCategories?: ParentCategory[]
  title?: string
  submitButtonText?: string
}

const AddParentCategoryModal = ({
  opened,
  onClose,
  onSubmit,
  //   existingCategories = [],
  title = 'Add Parent Category',
  submitButtonText = 'Add New +',
}: AddParentCategoryModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = () => {
    if (!name.trim()) return

    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      image: file || undefined,
    })

    // Reset form
    setName('')
    setDescription('')
    setFile(null)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      radius="md"
      size="lg"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md">
        {/* Name Input */}
        <div>
          <Text size="sm" fw={500} mb={4}>
            Name
          </Text>
          <TextInput
            placeholder="Enter category name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <Text size="sm" fw={500} mb={4}>
            Description
          </Text>
          <Textarea
            placeholder="Bio"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            autosize
            minRows={3}
          />
        </div>

        {/* File Upload */}
        <div>
          <Text size="sm" fw={500} mb={4}>
            Pick a file
          </Text>
          <FileInput
            placeholder="CHOOSE FILE"
            value={file}
            onChange={setFile}
            clearable
          />
          <Text size="xs" c="dimmed" mt={4}>
            {file ? file.name : 'No file chosen'}
          </Text>
        </div>

        <Divider />

        {/* Add New Button */}
        <Group justify="center">
          <Button
            onClick={handleSubmit}
            variant="filled"
            disabled={!name.trim()}
          >
            {submitButtonText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

export default AddParentCategoryModal
