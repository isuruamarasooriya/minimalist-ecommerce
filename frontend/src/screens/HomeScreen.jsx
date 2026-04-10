import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
  const { keyword } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = keyword 
          ? `http://localhost:5000/api/products?keyword=${keyword}` 
          : 'http://localhost:5000/api/products'
          
        const { data } = await axios.get(url)
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products", error)
      }
    }

    fetchProducts()
  }, [keyword])

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 uppercase tracking-wide">
        {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
      </h1>
      
      {products.length === 0 && keyword ? (
        <div className="text-red-500 font-bold mt-10">No products found for "{keyword}"</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeScreen