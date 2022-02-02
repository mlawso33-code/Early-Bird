import React, { useState } from 'react'


const ReviewModal = ({toggle, submit}) => {
  return (
    <div className="reviewModal">
      <div>
        <span className="closeReview" onClick={toggle}>X</span>
        <h3>STORE NAME</h3>
      </div>
      <form className="reviewModalBody" onSubmit={submit}>
        <input type="text-area" placeholder="Enter your review."></input>
      </form>
  </div>
  )
}

export default ReviewModal