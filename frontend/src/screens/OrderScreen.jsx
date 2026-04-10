import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const fetchOrder = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/orders/${orderId}`, config)
      setOrder(data)
      setLoading(false)
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      fetchOrder()
    }
  }, [order, orderId, userInfo.token])

  const deliverHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.put(`/api/orders/${orderId}/deliver`, {}, config)
      fetchOrder()
    } catch (err) {
      alert(err.response && err.response.data.message ? err.response.data.message : err.message)
    }
  }

  if (loading) return <div className="container mx-auto mt-10 p-4 text-center font-black uppercase tracking-widest text-gray-400">Loading Order Details...</div>
  if (error) return <div className="container mx-auto mt-10 p-4 text-center font-black uppercase tracking-widest text-red-500">{error}</div>

  return (
    <div className="container mx-auto mt-10 p-4 max-w-7xl">
      <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Order Details</h1>
      <p className="text-gray-400 font-mono text-sm mb-10">#{order._id}</p>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 flex flex-col gap-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group hover:border-black transition-all">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b-2 border-gray-100 pb-4 text-gray-400">Shipping Information</h2>
            <div className="mb-6 space-y-2">
              <p><strong className="text-black uppercase text-sm tracking-wide">Name: </strong> <span className="text-gray-600">{order.user.name}</span></p>
              <p><strong className="text-black uppercase text-sm tracking-wide">Email: </strong> <span className="text-gray-600">{order.user.email}</span></p>
              <p><strong className="text-black uppercase text-sm tracking-wide">Address: </strong> <span className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span></p>
            </div>
            {order.isDelivered ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl text-xs font-black uppercase tracking-widest border border-green-100">Delivered on {new Date(order.deliveredAt).toLocaleString()}</div>
            ) : (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-widest border border-red-100">Not Delivered</div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group hover:border-black transition-all">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b-2 border-gray-100 pb-4 text-gray-400">Payment Method</h2>
            <p className="mb-6"><strong className="text-black uppercase text-sm tracking-wide">Method: </strong> <span className="text-gray-600">{order.paymentMethod}</span></p>
            {order.isPaid ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl text-xs font-black uppercase tracking-widest border border-green-100">Paid on {new Date(order.paidAt).toLocaleString()}</div>
            ) : (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-black uppercase tracking-widest border border-red-100">Pending Payment</div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 group hover:border-black transition-all">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 border-b-2 border-gray-100 pb-4 text-gray-400">Order Items</h2>
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-6 py-4 border-b border-gray-50 last:border-0">
                  <img 
                    src={item.image.startsWith('http') ? item.image : `${axios.defaults.baseURL}${item.image}`} 
                    alt={item.name} 
                    className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-2" 
                  />
                  <Link to={`/product/${item.product}`} className="flex-1 font-bold text-gray-800 hover:text-gray-500 transition text-sm">
                    {item.name}
                  </Link>
                  <div className="font-black text-black text-sm">
                    {item.qty} x Rs. {item.price} = <span className="text-gray-400 ml-2">Rs. {item.qty * item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="lg:w-1/3">
          <div className="bg-black p-8 rounded-3xl shadow-2xl sticky top-24">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-800 pb-4 text-white">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 font-bold text-sm">Items:</span>
              <span className="text-white font-bold">Rs. {order.itemsPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-6">
              <span className="text-gray-400 font-bold text-sm">Shipping:</span>
              <span className="text-white font-bold">Rs. {order.shippingPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-end mb-10">
              <span className="text-gray-300 font-black text-sm uppercase tracking-widest">Total:</span>
              <span className="text-white font-black text-3xl">Rs. {order.totalPrice.toFixed(2)}</span>
            </div>

            {!order.isPaid && (
              <div className="mt-4 pt-6 border-t border-gray-800">
                <div className="bg-white p-6 rounded-2xl mb-4">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm orderId={order._id} userInfo={userInfo} />
                  </Elements>
                </div>
              </div>
            )}

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="mt-6 border-t border-gray-800 pt-6">
                <button
                  onClick={deliverHandler}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl text-xs"
                >
                  Mark As Delivered
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen