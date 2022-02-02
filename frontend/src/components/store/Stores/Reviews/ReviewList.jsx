import React, { useState, useEffect } from 'react'

import ReviewModal from './ReviewModal.jsx'
import StarRating from './StarRating.jsx'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'

import axios from 'axios'

const ReviewList = ({ store }) => {
  const [rate, setRate] = useState(0)
  const [reviews, setReviews] = useState([])
  const [displayModal, setDisplayModal] = useState(false);
  const [addReview, setAddReview] = useState(false)
  console.log('store:::', store)
  console.log('reviews:::', reviews)

  function fetchReviews(id) {
    axios
      .get(`/api/stores/${id}/reviews`)
      .then(res => setReviews(res.data))
  }


  function submitReview() {
  }

  function handleReview() {
    setAddReview(!addReview)
  }

  function handleRatingChange(newRate) {
    setRate(newRate)
  }

  useEffect(() => {
    fetchReviews(store.id)
  }, [])

  return (
    <div className="reviews">
      <div className="reviews-header">
        <div style={{ fontSize: '30px', color: 'white', marginRight: '16px' }}>Reviews</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '32px' }}>
          <div style={{ marginRight: '4px', color: 'rgb(199 197 197)', fontSize: '20px' }}>5.0</div>
          <div style={{ fontSize: '15px', marginRight: '10px', height: '20px', marginLeft: '3px', color: 'rgb(201 199 199)' }}>(14)</div>
        </div>

        <div>
          {reviews.map((review) => (
            //make a conditional for which store is picked
            <StarRating rate={review.rating} />
          ))}
        </div>
      </div>
      <hr className="hr" />
      <a href="" onClick={handleReview}>Add Review</a>
      <div className={`Modal ${displayModal ? 'Show' : ''}`}>
        {addReview ? <ReviewModal toggle={handleReview} submit="submitReview" /> : null}
      </div>
      <div className={`Overlay ${displayModal ? 'Show' : ''}`} />
      {reviews.map((review) => (
      <div className="reviews">
        <div className="review" style={{ background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px' }}>
          <div className="review-header" style={{ marginBottom: '6px' }}>
            <div style={{ color: 'white', marginRight: '5px', marginLeft: '10px' }}>Janie Smith</div>
            <div><Rating
              emptySymbol={<FaRegStar />}
              fullSymbol={<FaStar />}
              initialRating={review.rating} readonly />
            </div>
          </div>
          <div className="review-comment" style={{ color: 'white', fontSize: '12px', marginLeft: '10px' }}>
            {review.body}
          </div>
        </div>
        <div className="review" style={{ background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px' }}>
          <div className="review-header" style={{ marginBottom: '6px' }}>
            <div style={{ color: 'white', marginRight: '5px', marginLeft: '10px' }}>John Doe</div>
            <div style={{ color: 'rgb(255, 207, 46)', fontSize: '12px' }}>★★★★★</div>
          </div>
          <div className="review-comment" style={{ color: 'white', fontSize: '12px', marginLeft: '10px' }}>
            Great customer service! They had my coffee out in just a couple minutes!
          </div>
        </div>
      </div>

      ))}

    </div>
  )
}

export default ReviewList