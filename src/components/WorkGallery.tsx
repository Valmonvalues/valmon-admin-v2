import type { GalleryItem } from '@/types/user.types'
import { useState } from 'react'
import EmptyState from './EmptyState'

function WorkGallery({ gallery }: { gallery?: GalleryItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!gallery || gallery.length === 0)
    return <EmptyState message="Nothing here" />

  const handleSelect = (item: GalleryItem) => {
    setSelectedId(item.id.toString())
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {gallery?.map((image) => {
        const isSelected = selectedId === image.id

        return (
          <div
            key={image.id}
            onClick={() => handleSelect(image)}
            className={`group relative cursor-pointer border-white border-5 rounded-xl transition-all duration-200 ${isSelected ? 'border-gray-500' : 'border-transparent'}`}
          >
            <img
              src={image.asset_url}
              alt=""
              className="w-full h-full object-cover aspect-square rounded-lg transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
        )
      })}
    </div>
  )
}

export default WorkGallery
