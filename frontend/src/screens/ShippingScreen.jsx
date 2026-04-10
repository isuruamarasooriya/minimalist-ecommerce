import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShippingScreen = () => {
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {}

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    
    localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div className="container mx-auto mt-10 p-4 flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
          Shipping Address
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-800 transition shadow-md mt-4"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default ShippingScreen