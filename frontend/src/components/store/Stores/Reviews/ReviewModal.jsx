import React, { useState } from 'react'
import axios from 'axios'

import Rating from 'react-rating'
import {FaRegStar, FaStar} from 'react-icons/fa'

const ReviewModal = ({ toggle, fetch, userID, store}) => {
  // const[value, setValue] = useState(0)
  const[value, setValue] = useState(0)
  const[reviewBody, setReviewBody] = useState('')

  function submitReview() {
    event.preventDefault()
    var userObj = {
      'userId': userID,
      'storeId': store.id,
      'rating': value,
      'body': reviewBody,
    }
    console.log('userObj:::', userObj)
    axios
      .post(`/user/review`, userObj)
      .then(res => fetch)
      .then(toggle)
  }

  function handleReviewBody(newBody){
    setReviewBody(newBody)
  }

  function handleRatingChange(newRate) {
    setValue(newRate)
  }

  console.log('value::::', value)
  return (
    <div className="reviewModal">
      <div className="ModalTitle">{store.name}
        <span id="close" onClick={toggle}>X</span>

      </div>
      <form className="reviewModalBody" onSubmit={submitReview}>
        <Rating name='userRate'
          emptySymbol={<FaRegStar />}
          fullSymbol={<FaStar/>}
          onChange={handleRatingChange}
          value={value} />
        <input type="text" placeholder="Enter your review." onChange={e=> setReviewBody(e.target.value)} value={reviewBody}></input>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default ReviewModal