import React, { useState } from 'react'


const ReviewModal = ({toggle, submit}) => {
  return (
    <div className="reviewModal">
      <div className="reviewModalTitle">STORE NAME
        <button onClick={toggle}>X</button>

      </div>
      <form className="reviewModalBody" onSubmit={submit}>
        <input type="text-area" placeholder="Enter your review."></input>
      </form>
  </div>
  )
}

export default ReviewModal