import React, { useState, useEffect } from 'react'
import PaymentForm from './PaymentForm.jsx'

import axios from 'axios'
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Menu = ({ toggle, store, user, setUser }) => {
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
    var cartCopy = Array.from(cart)
    var index = 0;
    cartCopy.map((item) => {
      if (item.name === name) {
        index = cartCopy.indexOf(item)
      }
    })
    cartCopy.splice(index, 1)
    setCart(cartCopy)
  }

  function submitPayment() {
    var userObj = {
      'id': user.id,
      'reward_points': user.reward_points + cartQuantity
    }
    axios
    .put(`/users/rewards`, userObj)
    .then(setUser({...user, reward_points: user.reward_points + cartQuantity}))
    alert("Order sent!")
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

  return (
    <div>
      <div className="ModalTitle">{store.name}'s Menu
        <span id="close" onClick={toggle}>X</span>
      </div>
      <div id="categoryButtons">
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
      <div className="productList">
        {products.filter((val) => {
          if (val.category === category) {
            return val
          }
        }).map((product) => (
          <div>
            <span>{product.name} <button onClick={e => { addCart(e.target.value) }} value={product.name}>Add to Cart</button></span>
            <div>${product.price}</div>
          </div>
        ))}
      </div>
      <div className="cart">
        <AiOutlineShoppingCart size={50} />
        {cart.length > 0 && (
          <div>{cart.map((item) => (
            <span>{item.name}<button onClick={e => deleteItem(e.target.value)} value={item.name}>Delete</button></span>
          ))} </div>)}
        <br />
        {cart.length === 0 && ("Your cart is empty!!")}
        <br />
        ${total}
      </div>
      <div>
        <h3>Payment</h3>
        <PaymentForm />
        <form >
          <div>
            <h4>You've gained {cartQuantity} beans!!</h4>
          </div>
          <div>
            <span id="paymentIcons">
              <FaCcAmex size={50} />
              <FaCcVisa size={50} />
              <FaCcMastercard size={50} />
              <FaCcDiscover size={50} />
            </span>
          </div>
        </form >
          <button onClick={e => submitPayment(e.target.value)} value={cartQuantity}>Submit</button>
      </div >
    </div >
  )
}

export default Menu