import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Menu = ({ toggle, store }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
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
    setCart([...cart, e])
  }

  function submitPayment() {
    axios
      .post()
      .then()
  }

  function filterCategory(e) {
    setCategory(e)
  }


  useEffect(() => {
    fetchProducts(store.id)
  }, [])

  // useEffect(() => {
  //   setCart(cart)
  // }, [cart])

  return (
    <div>
      <div className="ModalTitle">{store.name}'s Menu
        <span id="close" onClick={toggle}>X</span>
      </div>
        <div id="categoryMenu">
          <button onClick={e => filterCategory(e.target.value)} value="food">Food</button>
          <button onClick={e => filterCategory(e.target.value)} value="coffee">Coffee</button>
          <button onClick={e => filterCategory(e.target.value)} value="tea">Tea</button>
        </div>
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
            <div>{item}</div>
          ))} </div>)}
        <br />
        {cart.length === 0 && ("Your cart is empty!!")}
        <div>
          <h3>Payment</h3>
          <form onClick={submitPayment}>
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="text"></input>
            <br />
            <input type="submit"></input>
            <h4>Apply rewards!!</h4>
          </form>
          <span id="paymentIcons">
            <FaCcAmex size={50} />
            <FaCcVisa size={50} />
            <FaCcMastercard size={50} />
            <FaCcDiscover size={50} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Menu


/*    {products.map((product) => (
      <div>
        <span>{product.name} <button onClick={e => { addCart(e.target.value) }} value={product.name}>Add to Cart</button></span>
        <div>${product.price}</div>
      </div>
    ))}

      // let tContainer = [];
  // let cContainer = [];
  // let fContainer = [];

  // function filterCategories() {
  //   products.map((product) => {
  //     if (product.category === 'tea') {
  //       tContainer.push(
  //         {
  //           products.map((product) => (
  //             <div>
  //               <span>{product.name} <button onClick={e => { addCart(e.target.value) }} value={product.name}>Add to Cart</button></span>
  //               <div>${product.price}</div>
  //             </div>
  //           ))
  //         })
  //     }
  //   })
  // }

    */