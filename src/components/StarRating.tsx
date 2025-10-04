import { IconStarFilled, IconStar } from '@tabler/icons-react'

function StarRating({
  rating,
  totalStars = 5,
  size = 18,
  color = 'text-yellow-500',
}) {
  const stars = []
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      i <= rating ? (
        <IconStarFilled key={i} size={size} className={color} />
      ) : (
        <IconStar key={i} size={size} className="text-gray-300" />
      ),
    )
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}

export default StarRating
