import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const OrderListScreen = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchOrders = async () => {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.get('http://localhost:5000/api/orders', config)
        setOrders(data)
        setLoading(false)
      }
      fetchOrders()
    } else {
      navigate('/login')
    }
  }, [navigate, userInfo])

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 uppercase">All Orders</h1>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-100">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Paid</th>
                <th className="px-6 py-4">Delivered</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-xs font-mono">{order._id}</td>
                  <td className="px-6 py-4 font-medium">{order.user && order.user.name}</td>
                  <td className="px-6 py-4 text-sm">{order.createdAt.substring(0, 10)}</td>
                  <td className="px-6 py-4 text-sm font-bold">Rs.{order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    {order.isPaid ? <span className="text-green-600 font-bold italic">Paid</span> : <span className="text-red-500 font-bold italic">Not Paid</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.isDelivered ? <span className="text-green-600 font-bold italic">Yes</span> : <span className="text-red-500 font-bold italic">No</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/order/${order._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition uppercase">
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

export default OrderListScreen