import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'

const UserOrdersScreen = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      const fetchMyOrders = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
          }
          const { data } = await axios.get('/api/orders/myorders', config)
          setOrders(data)
          setLoading(false)
        } catch (err) {
          setLoading(false)
        }
      }
      fetchMyOrders()
    }
  }, [navigate, userInfo])

  return (
    <div className="container mx-auto mt-10 p-4 max-w-6xl">
      <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter text-center">My Order History</h2>
      
      {loading ? (
        <div className="flex items-center justify-center gap-3 text-gray-400 font-bold uppercase tracking-widest animate-pulse h-40">
          Loading Your Orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 p-20 rounded-3xl border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-black uppercase tracking-widest mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-black text-white uppercase text-[10px] tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Total Price</th>
                <th className="px-8 py-6 text-center">Payment</th>
                <th className="px-8 py-6 text-center">Delivery</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-bold text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-all group">
                  <td className="px-8 py-6 font-mono text-[11px] text-gray-400 group-hover:text-black transition">#{order._id.slice(-10)}</td>
                  <td className="px-8 py-6 text-sm">{order.createdAt.substring(0, 10)}</td>
                  <td className="px-8 py-6 text-lg font-black text-black">Rs.{order.totalPrice.toFixed(2)}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-full ${order.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-full ${order.isDelivered ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      {order.isDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link to={`/order/${order._id}`} className="inline-block bg-white border-2 border-gray-100 text-black px-6 py-3 rounded-xl font-black text-[10px] hover:border-black transition uppercase tracking-widest">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserOrdersScreen