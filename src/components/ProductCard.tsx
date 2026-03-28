import { Text } from '@mantine/core'
// import { IconTrash } from '@tabler/icons-react'

function ProductCard({
  title,
  images,
  price,
}: {
  title: string
  images: string[]
  price: string | number
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 relative w-full max-w-[260px]">
      {/* <button
        className="absolute top-2 right-2 bg-red-50 p-2 rounded-full hover:bg-red-100"
      >
        <IconTrash size={16} className="text-red-500" />
      </button> */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-36 object-cover"
        />
      </div>

      <div className="mt-3">
        <Text size="sm" c="dimmed" fw={500}>
          {title}
        </Text>
        {/* ₦ */}
        <Text size="lg" fw={600} mt={4}>
          NGN {Number(price)?.toLocaleString('en-NG')}
        </Text>
      </div>
    </div>
  )
}

export default ProductCard
