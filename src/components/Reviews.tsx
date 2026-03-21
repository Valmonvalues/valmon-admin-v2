import type { Review } from '@/types/user.types'
import ReviewCard from './user/ReviewCard'
import { IconStarFilled } from '@tabler/icons-react'
import EmptyState from './EmptyState'

function Reviews({ reviews }: { reviews?: Review[] }) {
  if (!reviews || reviews.length === 0)
    return <EmptyState message="No reviews yet for this user." />

  const totalReviews = reviews.length
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = (totalRating / totalReviews).toFixed(1)

  const ratingCounts: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }
  for (const review of reviews) {
    if (ratingCounts[review.rating] !== undefined) {
      ratingCounts[review.rating]++
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-center lg:w-2/3 p-4 gap-6 bg-white rounded-lg">
        <div className="">
          <div className="flex items-center justify-center w-full gap-2 mb-2">
            <span className="text-5xl font-bold text-gray-800">
              {averageRating}
            </span>
            <IconStarFilled className="text-yellow-400" />
          </div>
          <div className="px-3 py-1.5 bg-black rounded-full self-center-safe mb-4">
            <p className="text-sm text-white">{totalReviews} reviews</p>
          </div>
        </div>

        <div className="w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const countForStar = ratingCounts[star]
            const percentage = (countForStar / totalReviews) * 100

            return (
              <div
                key={star}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span>{star} ★</span>
                <div className="flex-grow bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-full rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewerName={`${review.reviewer.first_name} ${review.reviewer.last_name}`}
              rating={review.rating}
              avatar={review.reviewer.profile_pic}
              comment={review.content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
