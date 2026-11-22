import { useState } from 'react'
import { Modal, Text } from '@mantine/core'
import {
  IconExternalLink,
  IconFileText,
  IconZoomIn,
} from '@tabler/icons-react'

type Props = {
  url: string
  /** Shown as the modal title and image alt text. */
  label?: string
  /** Classes for the thumbnail image. */
  thumbnailClassName?: string
}

const isPdf = (url: string) => /\.pdf($|\?)/i.test(url)

/**
 * Evidence thumbnail that opens full size in a modal, so the admin can read
 * screenshots and photos without leaving the ticket. PDFs open in a new tab.
 */
export default function EvidenceViewer({
  url,
  label = 'Evidence',
  thumbnailClassName = 'h-[140px] w-full object-cover',
}: Props) {
  const [opened, setOpened] = useState(false)

  if (isPdf(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-blue-700 hover:bg-gray-50"
      >
        <IconFileText size={18} />
        View {label.toLowerCase()} (PDF)
        <IconExternalLink size={14} className="ml-auto" />
      </a>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpened(true)}
        className="group relative mt-3 block w-full overflow-hidden rounded-md"
        title="Click to enlarge"
      >
        <img src={url} alt={label} className={thumbnailClassName} />
        <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/0 text-sm font-medium text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
          <IconZoomIn size={18} /> Click to enlarge
        </span>
      </button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text fw={600}>{label}</Text>}
        size="xl"
        centered
        overlayProps={{ backgroundOpacity: 0.7, blur: 2 }}
      >
        <div className="flex justify-center rounded-md bg-gray-50">
          <img
            src={url}
            alt={label}
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-blue-700 hover:underline"
          >
            Open original <IconExternalLink size={14} />
          </a>
        </div>
      </Modal>
    </>
  )
}
