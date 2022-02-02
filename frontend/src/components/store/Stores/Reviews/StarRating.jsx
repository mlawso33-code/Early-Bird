import React from 'react'
import Rating from 'react-rating'

import {FaRegStar, FaStar} from 'react-icons/fa'

const StarRating = ({ rate }) => {
  return (
    <Rating
    emptySymbol={<FaRegStar />}
    fullSymbol={<FaStar/>}
    initialRating={rate}
    readonly
  />
  )
}

export default StarRating