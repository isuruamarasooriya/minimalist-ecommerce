import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from '../axios'

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchCartData = async () => {
      let currentCart = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : []

      if (id) {
        try {
          const { data } = await axios.get(`/api/products/${id}`)
          
          const item = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
          }

          const existItem = currentCart.find(x => x.product === item.product)

          if (existItem) {
            currentCart = currentCart.map(x => x.product === existItem.product ? item : x)
          } else {
            currentCart = [...currentCart, item]
          }

          localStorage.setItem('cartItems', JSON.stringify(currentCart))
          navigate('/cart', { replace: true })
        } catch (error) {
          console.error("Error fetching product for cart", error)
        }
      }

      setCartItems(currentCart)
    }

    fetchCartData()
  }, [id, qty, navigate])

  const updateCartQty = (productId, newQty) => {
    const updatedCart = cartItems.map(item => 
      item.product === productId ? { ...item, qty: Number(newQty) } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const removeFromCartHandler = (productId) => {
    const updatedCart = cartItems.filter(item => item.product !== productId)
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-4xl font-black mb-10 uppercase tracking-tighter">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          {cartItems.length === 0 ? (
            <div className="bg-gray-50 p-20 rounded-3xl border-2 border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
              <p className="text-gray-400 font-black uppercase tracking-widest mb-6">Your cart is empty.</p>
              <Link to="/" className="inline-block bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-xl text-xs">
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.product} className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-3xl shadow-xl border border-gray-100 gap-6 group hover:border-black transition-all">
                  
                  <img 
                    src={item.image.startsWith('http') ? item.image : `${axios.defaults.baseURL}${item.image}`} 
                    alt={item.name} 
                    className="w-24 h-24 object-contain rounded-xl bg-gray-50 p-2" 
                  />
                  
                  <Link to={`/product/${item.product}`} className="flex-1 font-black text-lg text-gray-800 hover:text-gray-500 truncate px-4 transition">
                    {item.name}
                  </Link>
                  
                  <div className="w-28 font-black text-black text-xl text-center">
                    Rs. {item.price}
                  </div>
                  
                  <div className="border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                    <select 
                      value={item.qty} 
                      onChange={(e) => updateCartQty(item.product, e.target.value)}
                      className="px-4 py-3 bg-transparent font-black outline-none cursor-pointer appearance-none text-center min-w-[70px]"
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={() => removeFromCartHandler(item.product)} 
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors p-3 border-2 border-transparent hover:border-red-100 rounded-xl bg-gray-50 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 sticky top-24">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-b-2 border-gray-100 pb-4 text-gray-400">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <div className="text-4xl font-black text-black mb-10">
              Rs. {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </div>
            <button 
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed text-xs"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen