import React, {useState} from 'react'

import Axios from 'Axios'

const Menu = () => {
  const [products, setProducts] = useState([])

  function fetchProducts() {
  }
  return(
    <div>
      <div className="productList">
        {products.map((item) => (
          {item.name}
          <br/>
          ${item.price}
        ))}
      </div>
    </div>
  )
}