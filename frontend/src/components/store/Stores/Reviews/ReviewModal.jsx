import React, { useState } from 'react'

import Rating from 'react-rating'
import {FaRegStar, FaStar} from 'react-icons/fa'

const ReviewModal = ({ toggle, submit }) => {
  const[value, setValue] = useState(0)
  function handleRating(newRate) {
    setValue(newRate)
  }
  return (
    <div className="reviewModal">
      <div className="ModalTitle">STORE NAME
        <span id="close" onClick={toggle}>X</span>

      </div>
      <form className="reviewModalBody" onSubmit={submit}>
        <Rating name='userRate'
          emptySymbol={<FaRegStar />}
          fullSymbol={<FaStar/>}
          onChange={handleRating}
          value={userRate} />
        <input type="text-area" placeholder="Enter your review."></input>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default ReviewModal