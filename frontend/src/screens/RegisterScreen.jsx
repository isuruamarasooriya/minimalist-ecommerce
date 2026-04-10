import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const rawRedirect = location.search ? location.search.split('=')[1] : '/'
  const redirect = rawRedirect.startsWith('/') ? rawRedirect : `/${rawRedirect}`

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect])

  const submitHandler = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        { name, email, password },
        config
      )

      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect)
      
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message)
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-800 transition shadow-md mt-4"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link 
            to={rawRedirect !== '/' ? `/login?redirect=${rawRedirect}` : '/login'} 
            className="text-blue-600 font-bold hover:underline"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen