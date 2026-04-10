import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductListScreen = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products')
      setProducts(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts()
    } else {
      navigate('/login')
    }
  }, [navigate, userInfo])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        await axios.delete(`http://localhost:5000/api/products/${id}`, config)
        fetchProducts()
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase">Products</h1>
        <Link to="/admin/product/add" className="bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
          + Add Product
        </Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-100">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-xs font-mono">{product._id}</td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">Rs.{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.countInStock}</td>
                  <td className="px-6 py-4 flex gap-3 justify-end">
                    <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:underline font-bold">Edit</Link>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:underline font-bold">Delete</button>
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

export default ProductListScreen