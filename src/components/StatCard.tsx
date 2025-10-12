import { Card } from '@mantine/core'
import { type StatCardProps } from '@/types/user.types'
import { Image } from '@mantine/core'

const StatCard = ({
  title,
  value,
  color,
  image,
  showImage = true,
  imageSize = 30,
  imageClassName = '',
}: StatCardProps) => {
  const renderImage = () => {
    if (!showImage) return null

    // If no image provided, return null
    if (!image) return null

    // If image is a string (image path/URL), render as Image
    if (typeof image === 'string') {
      return (
        <Image
          radius="md"
          h={imageSize}
          w="auto"
          src={image}
          alt={title}
          className={imageClassName}
        />
      )
    }

    // If image is a React node (custom element), render it directly
    return <div className={imageClassName}>{image}</div>
  }

  return (
    <Card shadow="sm" radius="lg" className="px-6 py-5 bg-white">
      <div className="flex flex-col justify-between gap-2">
        <h3 className="text-[16px] font-medium text-gray-500">{title}</h3>

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-900">{value}</p>
          <div
            className={`flex h-12 w-12 justify-center items-center rounded-xl ${color}`}
          >
            {/* <img src={profile} alt="" /> */}
            {/* h={20} w="auto"  */}
            {/* <Image radius="md" h={30} w="auto" src={profile} /> */}
            {showImage && image && (
              <div
                className={`flex h-12 w-12 justify-center items-center rounded-xl ${color}`}
              >
                {renderImage()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default StatCard
