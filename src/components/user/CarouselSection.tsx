import { Image } from '@mantine/core'
import { dummyImages } from '../Navigation/data/dummyData'
import { Carousel } from '@mantine/carousel'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

function CarouselSection() {
  const slides = dummyImages.map((image) => (
    <Carousel.Slide key={image.id}>
      <Image
        src={image.src}
        alt={image.alt}
        radius="lg"
        className="w-full h-96 object-cover"
      />
    </Carousel.Slide>
  ))

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Images</h2>
        <p className="text-sm font-bold text-yellow-800 hover:text-gray-800 transition-colors">
          View All
        </p>
      </div>

      <Carousel
        slideSize="50%"
        slideGap="md"
        controlsOffset="xs"
        nextControlIcon={<IconChevronRight size={20} />}
        previousControlIcon={<IconChevronLeft size={20} />}
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
          controls: {
            top: '50%',
            transform: 'translateY(-50%)',
            left: '0',
            right: '0',
            width: '100%',
            justifyContent: 'space-between',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
          indicator: {
            // Hide indicators if not needed
            display: 'none',
          },
        }}
      >
        {slides}
      </Carousel>
    </div>
  )
}

export default CarouselSection
