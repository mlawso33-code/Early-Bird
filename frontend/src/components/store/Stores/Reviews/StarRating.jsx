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
    />
  )
}

export default StarRating