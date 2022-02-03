import React, { useState } from 'react'

import axios from 'axios'
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa } from 'react-icons/fa'

const Menu = ({ toggle }) => {
  const [products, setProducts] = useState([])

  function fetchProducts() {
  }
  return (
    <div>
      <div className="ModalTitle">STORE NAME
        <span id="close" onClick={toggle}>X</span>

      </div>
      <div className="productList">
        <div>Item 1
          < br />
          <span>$100</span>
        </div>
        <div>Item 2
          < br />
          <span>$10</span>
        </div>
        <div>Item 3
          <br />
          <span>$1</span>
        </div>
        <div>Item 4
          <br />
          <span>$15</span>
        </div>
        <div>Item 5
          < br />
          <span>$52</span>
        </div>
        <div>Item 6
          <br />
          <span>$1921</span>
        </div>
      </div>
      <div className="cart">
        <h3>Your cart</h3>
        Item1
        Item2
        <div>
          <h3>Payment</h3>
          <span id="paymentIcons">
            <FaCcAmex size={50}/>
            <FaCcVisa size={50}/>
            <FaCcMastercard size={50}/>
            <FaCcDiscover size={50}/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Menu