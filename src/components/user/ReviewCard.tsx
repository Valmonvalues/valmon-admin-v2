import StarRating from '../StarRating'

function ReviewCard({
  reviewerName,
  rating,
  avatar,
  comment,
}: {
  reviewerName: string
  rating: number
  avatar: string
  comment: string
}) {
  return (
    <div className="flex items-start gap-3 border border-gray-200 p-4 rounded-lg">
      <img
        src={avatar}
        alt={reviewerName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-gray-800">{reviewerName}</h4>
          <StarRating rating={rating} size={16} />
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard
