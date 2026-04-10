import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {}
  const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod')) || 'PayPal'
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingPrice = itemsPrice > 5000 ? 0 : 350
  const totalPrice = itemsPrice + shippingPrice

  const [error, setError] = useState('')

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        },
        config
      )

      localStorage.removeItem('cartItems')
      navigate(`/order/${data._id}`)
      
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message)
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-tight text-center md:text-left">
        Review Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* වම් පැත්ත: Order Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wider text-gray-700">Shipping</h2>
            <p className="text-gray-600">
              <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wider text-gray-700">Payment Method</h2>
            <p className="text-gray-600 italic font-medium">Method: {paymentMethod}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-700">Order Items</h2>
            {cartItems.length === 0 ? <p>Your cart is empty</p> : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <Link to={`/product/${item.product}`} className="font-semibold hover:underline text-blue-600">{item.name}</Link>
                    </div>
                    <div className="font-medium">
                      {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Items</span>
              <span>Rs.{itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Shipping</span>
              <span>Rs.{shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-4 mb-6 pt-4 border-t text-2xl font-extrabold text-blue-600">
              <span>Total</span>
              <span>Rs.{totalPrice.toFixed(2)}</span>
            </div>

            {error && <div className="text-red-500 mb-4 font-bold">{error}</div>}

            <button
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition shadow-md disabled:bg-gray-400"
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PlaceOrderScreen