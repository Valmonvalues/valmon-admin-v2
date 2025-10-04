import { IconStarFilled } from '@tabler/icons-react'
import { dummyReviews } from '../Navigation/data/dummyData'
import StarRating from '../StarRating'
import ReviewCard from './ReviewCard'

function ReviewsSection() {
  // Calculate average rating (example)
  const totalRating = dummyReviews.reduce(
    (sum, review) => sum + review.rating,
    0,
  )
  const averageRating = (totalRating / dummyReviews.length).toFixed(1)
  const totalReviews = dummyReviews.length

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
        <p className="text-sm font-bold hover:text-gray-800 transition-colors text-yellow-700">
          View All
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: Rating Summary */}
        <div className="lg:w-1/3 p-4 bg-white rounded-lg flex flex-col items-start justify-center border-r border-gray-200">
          <div className="flex items-center justify-center w-full gap-2 mb-2">
            <span className="text-5xl font-bold text-gray-800">
              {averageRating}
            </span>
            <IconStarFilled />
          </div>
          <div className="px-3 py-1.5 bg-black rounded-full self-center-safe mb-4">
            <p className="text-sm text-white">{totalReviews} reviews</p>
          </div>

          {/* Star distribution bars (simplified for example) */}
          <div className="w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span>{star}*</span>
                <div className="flex-grow bg-gray-200 rounded-full h-2">
                  <div
                    className="background h-full rounded-full"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Individual Reviews */}
        <div className="lg:w-2/3 space-y-4">
          {dummyReviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewerName={review.reviewerName}
              rating={review.rating}
              avatar={review.avatar}
              comment={review.comment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsSection
