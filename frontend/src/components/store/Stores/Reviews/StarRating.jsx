import React from 'react'
import Rating from 'react-rating'

import { FaRegStar, FaStar } from 'react-icons/fa'

const StarRating = ({ total }) => {
  return (
    <Rating
      emptySymbol={<FaRegStar />}
      fullSymbol={<FaStar />}
      initialRating={total}
      readonly
      style={{color:'rgb(255, 207, 46)'}}
    />
  )
}

export default StarRating