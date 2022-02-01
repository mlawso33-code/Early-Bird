import React, { useState } from 'react'


const ReviewModal = ({toggle}) => {
  return (
    <div className="reviewModal">
      <div>
        <span className="closeReview" onClick={toggle}>X</span>
        <h3>STORE NAME</h3>
      </div>
      <form className="reviewModalBody" onSubmit={handleSubmitQuestion}>
        <small className="greyText"><span className="redText">* </span> required</small>
        <br />
        <br />
        <span className="redText">*</span><label>Username:
          <br />
          <input className="width50" type="text" value={name} placeholder="Example: jack543!" max="60" onChange={e => setUser(e.target.value)} /></label>
        <br />
        <br />
        <span className="redText">* </span><label>Email:
          <br />
          <input className="width50" type="email" value={email} placeholder="Example: jack@email.com" max="60" onChange={e => setEmail(e.target.value)} /> </label>
        <br />
        <br />
        <span className="redText">* </span><label>Question:
          <br />
          <textarea rows="5" cols="65" value={body} placeholder="Type question here..." max="1000" onChange={e => setBody(e.target.value)} /></label>
        <br />
        <br />
        <input className="questionButton" type="submit" value="Submit Question" />
      </form>
  </div>
  )
}

export default ReviewModal