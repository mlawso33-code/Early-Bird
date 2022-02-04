<<<<<<< HEAD:frontend/src/components/store/Menu/Menu.jsx
import React, { useState, useEffect } from 'react'
import PaymentForm from './PaymentForm.jsx'
=======
import React, { useState } from 'react'
>>>>>>> parent of b91137f (menu adds to cart, filters based on category selected):frontend/src/components/store/Menu.jsx

import axios from 'axios'
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa } from 'react-icons/fa'

<<<<<<< HEAD:frontend/src/components/store/Menu/Menu.jsx
const Menu = ({ toggle, store }) => {
  const [total, setTotal] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(0);
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [teaCategory, setTea] = useState([])
  const [foodCategory, setFood] = useState([])
  const [coffeeCategory, setCoffee] = useState([])


  console.log('products:::', products)
  console.log('current store:::', store)
  console.log('cart::::', cart)

  function fetchProducts(id) {
    axios
      .get(`/stores/${id}/menu`)
      .then(res => setProducts(res.data))
  }

  function addCart(e) {
    products.filter((val) => {
      if (e === val.name) {
        return val
      }
    }).map((product) => {
      setCart([...cart, product])
    })
    getTotal()
  }

  function getTotal() {
    cart.reduce((sum, product) => {
      setTotal(Number(sum.price) + cartQuantity * Number(product.price))
    })
  }

  function deleteItem(name) {
    // var newCart = cart
    // for (var i = 0; i < cart.length; i++) {
    //   if(cart[i].name === name) {
    //     newCart.splice(i, 1)
    //   }
    // }
    var currIndex = cart.map((item) => {
      cart.indexOf(item.name === name)
    })
    setCart(cart.splice(currIndex, 1))
  }

  function submitPayment() {
    alert("Order sent!")
      .then()
  }

  function filterCategory(e) {
    setCategory(e)
  }


  useEffect(() => {
    fetchProducts(store.id)
  }, [])

  useEffect(() => {
    setCartQuantity(cart.length)
  }, [cart])

=======
const Menu = ({ toggle }) => {
  const [products, setProducts] = useState([])

  function fetchProducts() {
  }
>>>>>>> parent of b91137f (menu adds to cart, filters based on category selected):frontend/src/components/store/Menu.jsx
  return (
    <div>
      <div className="ModalTitle">STORE NAME
        <span id="close" onClick={toggle}>X</span>

      </div>
<<<<<<< HEAD:frontend/src/components/store/Menu/Menu.jsx
      <div id="categoryMenu">
        <button onClick={e => filterCategory(e.target.value)} value="food">Food</button>
        <button onClick={e => filterCategory(e.target.value)} value="coffee">Coffee</button>
        <button onClick={e => filterCategory(e.target.value)} value="tea">Tea</button>
      </div>
      <div>
        <h4>Featured Items</h4>
        {JSON.parse(store.featured_drinks).map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <hr className="hr" />
=======
>>>>>>> parent of b91137f (menu adds to cart, filters based on category selected):frontend/src/components/store/Menu.jsx
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
<<<<<<< HEAD:frontend/src/components/store/Menu/Menu.jsx
        <AiOutlineShoppingCart size={50} />
        {/* //able to delete cart items */}
        {cart.length > 0 && (
          <div>{cart.map((item) => (
            <span>{item.name}<button onClick={deleteItem} value={item.name}>Delete</button></span>
          ))} </div>)}
        <br />
        {cart.length === 0 && ("Your cart is empty!!")}
        <br />
        ${total}
        <div>
          <h3>Payment</h3>
          {/* <form onClick={submitPayment}>
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="submit"></input>
          </form> */}
          <form onClick={submitPayment}>
            <PaymentForm />
            <div>
              <h4>Apply rewards!!</h4>
            </div>
            <div>
              <span id="paymentIcons">
                <FaCcAmex size={50} />
                <FaCcVisa size={50} />
                <FaCcMastercard size={50} />
                <FaCcDiscover size={50} />
              </span>
            </div>
            <input type="submit" value="Submit" />
          </form>
=======
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
>>>>>>> parent of b91137f (menu adds to cart, filters based on category selected):frontend/src/components/store/Menu.jsx
        </div>
      </div>
    </div>
  )
}

export default Menu