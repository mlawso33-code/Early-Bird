import React, { useState } from 'react'


const ReviewModal = ({toggle, submit}) => {
  return (
    <div className="reviewModal">
      <div className="ModalTitle">STORE NAME
        <span id="close" onClick={toggle}>X</span>

      </div>
      <form className="reviewModalBody" onSubmit={submit}>
        <input type="text-area" placeholder="Enter your review."></input>
        <button type="submit">Submit Review</button>
      </form>
  </div>
  )
}

export default ReviewModal