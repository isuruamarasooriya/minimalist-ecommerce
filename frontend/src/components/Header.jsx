import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          MINIMALIST.
        </Link>
        <nav className="space-x-4">
          <Link to="/cart" className="hover:text-gray-300">Cart</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header