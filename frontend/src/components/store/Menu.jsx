import React, {useState} from 'react'

import axios from 'axios'

const Menu = () => {
  const [products, setProducts] = useState([])

  function fetchProducts() {
    axios
    .get()
    .then()
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