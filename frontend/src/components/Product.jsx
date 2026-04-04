import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">
            {product.name}
          </h2>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            Rs. {product.price}
          </span>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product