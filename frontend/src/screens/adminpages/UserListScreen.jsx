import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const UserListScreen = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get('/api/users', config)
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchUsers()
    } else {
      navigate('/login')
    }
  }, [navigate, userInfo])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        await axios.delete(`/api/users/${id}`, config)
        fetchUsers()
      } catch (err) {
        alert(err.response && err.response.data.message ? err.response.data.message : err.message)
      }
    }
  }

  if (loading) return <div className="text-center mt-20 font-bold text-gray-600 uppercase tracking-widest">Loading Users...</div>
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-black mb-8 uppercase tracking-tighter border-b-4 border-black inline-block">Registered Users</h1>
      
      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100 mt-6">
        <table className="w-full text-left bg-white border-collapse">
          <thead className="bg-black text-white uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-5">ID</th>
              <th className="px-6 py-5">Name</th>
              <th className="px-6 py-5">Email</th>
              <th className="px-6 py-5 text-center">Admin Status</th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{user._id}</td>
                <td className="px-6 py-4 font-bold text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  {user.isAdmin ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase">Admin</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase">User</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => deleteHandler(user._id)}
                    className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                    title="Delete User"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserListScreen