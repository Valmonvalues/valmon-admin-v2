import { IconStarFilled } from '@tabler/icons-react'
import ReviewCard from './ReviewCard'
import type { Review } from '@/types/user.types'

function ReviewsSection({ reviews }: { reviews: Review[] | undefined }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
        <p className="mt-4 text-gray-600">No reviews yet for this user.</p>
      </div>
    )
  }

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
    <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
        <p className="text-sm font-bold hover:text-gray-800 transition-colors text-yellow-700">
          View All
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 p-4 bg-white rounded-lg flex flex-col items-start justify-center border-r border-gray-200">
          <div className="flex items-center justify-center w-full gap-2 mb-2">
            <span className="text-5xl font-bold text-gray-800">
              {averageRating}
            </span>
            <IconStarFilled className="text-yellow-400" />
          </div>
          <div className="px-3 py-1.5 bg-black rounded-full self-center-safe mb-4">
            <p className="text-sm text-white">{totalReviews} reviews</p>
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

        <div className="lg:w-2/3 space-y-4">
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

export default ReviewsSection
