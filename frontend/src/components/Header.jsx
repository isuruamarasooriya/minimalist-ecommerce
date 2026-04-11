import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBox from './SearchBox'

const Header = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  const updateHeader = () => {
    const user = localStorage.getItem('userInfo')
    setUserInfo(user ? JSON.parse(user) : null)

    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0)
    setCartCount(count)
  }

  useEffect(() => {
    updateHeader()

    window.addEventListener('userInfoUpdated', updateHeader)
    window.addEventListener('storage', updateHeader)

    return () => {
      window.removeEventListener('userInfoUpdated', updateHeader)
      window.removeEventListener('storage', updateHeader)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    setUserInfo(null)
    window.dispatchEvent(new Event('userInfoUpdated'))
    navigate('/login')
  }

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap lg:flex-nowrap justify-between items-center gap-4">
        
        <Link to="/" className="text-2xl font-extrabold tracking-widest text-white hover:text-gray-300 transition shrink-0">
          MINIMALIST.
        </Link>

        <div className="w-full lg:w-auto flex-1 max-w-xl mx-auto order-last lg:order-none px-0 lg:px-8 text-black">
          <SearchBox />
        </div>

        <nav className="flex items-center gap-8 text-sm font-semibold tracking-wide uppercase shrink-0">
          
          <Link to="/cart" className="relative flex items-center hover:text-blue-400 transition">
            <span className="mr-1 text-white">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-blue-400 transition outline-none uppercase font-bold text-blue-400 py-2">
                {userInfo.name} <span className="text-xs">&#x25BC;</span>
              </button>
              
              <div className="absolute right-0 top-full pt-1 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50">
                <div className="bg-white text-gray-800 rounded-md shadow-xl flex flex-col overflow-hidden border border-gray-100">
                  <Link to="/profile" className="px-4 py-3 hover:bg-gray-100 transition border-b border-gray-100 font-bold text-xs uppercase tracking-wider">
                    Profile
                  </Link>
                  
                  <Link to="/myorders" className="px-4 py-3 hover:bg-gray-100 transition border-b border-gray-100 font-bold text-xs uppercase tracking-wider">
                    My Orders
                  </Link>

                  <button 
                    onClick={logoutHandler} 
                    className="px-4 py-3 text-left hover:bg-gray-100 transition w-full text-red-600 font-bold uppercase text-xs tracking-wider"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition text-white">
              Login
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-green-400 transition outline-none uppercase font-bold text-green-400 py-2">
                Admin <span className="text-xs">&#x25BC;</span>
              </button>
              
              <div className="absolute right-0 top-full pt-1 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible z-50">
                <div className="bg-white text-gray-800 rounded-md shadow-xl flex flex-col overflow-hidden border border-gray-100">
                  <Link to="/admin/userlist" className="px-4 py-3 hover:bg-gray-100 transition border-b border-gray-100">
                    Users
                  </Link>
                  <Link to="/admin/productlist" className="px-4 py-3 hover:bg-gray-100 transition border-b border-gray-100">
                    Products
                  </Link>
                  <Link to="/admin/orderlist" className="px-4 py-3 hover:bg-gray-100 transition">
                    Orders
                  </Link>
                </div>
              </div>
            </div>
          )}
          
        </nav>
      </div>
    </header>
  )
}

export default Header