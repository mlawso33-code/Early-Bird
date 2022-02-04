import React, { useState, useEffect } from 'react'

import ReviewModal from './ReviewModal.jsx'
import StarRating from './StarRating.jsx'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import axios from 'axios'


const ReviewList = ({ store, userID }) => {
  const [totalReviews, setTotalReviews] = useState(0)
  const [storeReviews, setStoreReviews] = useState([])
  const [addReview, setAddReview] = useState(false)

  console.log('store:::', store)
  console.log('store reviews:::', storeReviews)

  function fetchStoreReviews(id) {
    axios
      .get(`/stores/${id}/reviews`)
      .then(res => setStoreReviews(res.data))
  }

  function getMaxRating() {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const rating = storeReviews.map(reviews => reviews.rating)
    const finalRating = rating.reduce(reducer) / storeReviews.length
    setTotalReviews(finalRating.toFixed(1))
  }

  function handleReview() {
    setAddReview(!addReview)
  }

  useEffect(() => {
    fetchStoreReviews(store.id)
  }, [store])

  useEffect(() => {
    setTimeout(() => getMaxRating(), 500)
  }, [storeReviews])

  return (
    <div className="reviews">
      <div className="reviews-header">
        <div style={{ fontSize: '30px', color: 'white', marginRight: '16px' }}>Reviews</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '32px' }}>
          <div style={{ marginRight: '4px', color: 'rgb(199 197 197)', fontSize: '20px' }}>{totalReviews}</div>
          <div style={{ fontSize: '15px', marginRight: '10px', height: '20px', marginLeft: '3px', color: 'rgb(201 199 199)' }}>({storeReviews.length})</div>
        </div>

        <div>
          <StarRating total={totalReviews} />
        </div>
      </div>
      <hr className="hr" />

      <button onClick={handleReview}>Add Review</button>
      <div className={`Modal ${addReview ? 'Show' : ''}`}>
        {addReview ? <ReviewModal toggle={handleReview} fetch={fetchStoreReviews} store={store} userID={userID}/> : null}
      </div>
      <div className={`Overlay ${addReview ? 'Show' : ''}`} />

      <div className="reviews">
        {storeReviews.map((review) => (
          <div className="review" style={{ background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px' }}>
            <div className="review-header" style={{ marginBottom: '6px' }}>
              <div style={{ color: 'white', marginRight: '5px', marginLeft: '10px' }}>{review.username}</div>
              <div><Rating
                key={review.id}
                emptySymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
                initialRating={review.rating} readonly />
              </div>
            </div>
            <div className="review-comment" style={{ color: 'white', fontSize: '12px', marginLeft: '10px' }}>
              {review.body}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ReviewList