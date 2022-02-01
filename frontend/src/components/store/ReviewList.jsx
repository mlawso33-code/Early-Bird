import React, {useState} from 'react'

import ReviewModal from './ReviewModal.jsx'
import axios from 'axios'

const ReviewList = () => {

  const[addReview, setAddReview] = useState(false)

  function submitReview() {
    axios
    .post()
    .then()
  }

  function addReview() {
    setAddReview(!addReview)
  }

  return (
    <div className="reviews">
    <div className="reviews-header">
      <div style={{fontSize: '30px', color: 'white', marginRight: '16px'}}>Reviews</div>
      <div style={{display: 'flex', alignItems: 'flex-end', height: '32px'}}>
        <div style={{marginRight: '4px', color: 'rgb(199 197 197)', fontSize: '20px'}}>5.0</div>
        <div style={{color: 'rgb(255, 207, 46)', fontSize: '17px'}}>★★★★★</div>
        <div style={{fontSize: '15px', marginRight: '10px', height: '20px', marginLeft: '3px', color: 'rgb(201 199 199)'}}>(14)</div>
      </div>
    </div>
    <hr className="hr"/>
    <a href="" className={`Modal ${displayModal ? 'Show' : ''}`}>
       {addReview ?  <ReviewModal toggle={addReview} /> : "Add a Review"}
      </a>
      <div className={`Overlay ${displayModal ? 'Show' : ''}`} />
    <div className="reviews">
      <div className="review" style={{background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px'}}>
        <div className="review-header" style={{marginBottom: '6px'}}>
          <div style={{color: 'white', marginRight: '5px', marginLeft: '10px'}}>Janie Smith</div>
          <div style={{color: 'rgb(255, 207, 46)', fontSize: '12px'}}>★★★★★</div>
        </div>
        <div className="review-comment" style={{color: 'white', fontSize: '12px', marginLeft: '10px'}}>
          Great customer service! They had my coffee out in just a couple minutes!
        </div>
      </div>
      <div className="review" style={{background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px'}}>
        <div className="review-header" style={{marginBottom: '6px'}}>
          <div style={{color: 'white', marginRight: '5px', marginLeft: '10px'}}>John Doe</div>
          <div style={{color: 'rgb(255, 207, 46)', fontSize: '12px'}}>★★★★★</div>
        </div>
        <div className="review-comment" style={{color: 'white', fontSize: '12px', marginLeft: '10px'}}>
          Great customer service! They had my coffee out in just a couple minutes!
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReviewList