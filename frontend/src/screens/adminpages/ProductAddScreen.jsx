import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const ProductAddScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('image', image)
    formData.append('category', category)
    formData.append('countInStock', countInStock)
    formData.append('description', description)

    try {
      setUploading(true)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      await axios.post('/api/products/add', formData, config)
      setUploading(false)
      navigate('/admin/productlist')
    } catch (err) {
      setUploading(false)
      alert('Error uploading product')
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg border">
        <input type="text" placeholder="Product Name" className="border p-3 rounded" onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" className="border p-3 rounded" onChange={(e) => setPrice(e.target.value)} required />
        <input type="file" className="border p-3 rounded" onChange={(e) => setImage(e.target.files[0])} required />
        <input type="text" placeholder="Category" className="border p-3 rounded" onChange={(e) => setCategory(e.target.value)} required />
        <input type="number" placeholder="Count In Stock" className="border p-3 rounded" onChange={(e) => setCountInStock(e.target.value)} required />
        <textarea placeholder="Description" className="border p-3 rounded" rows="4" onChange={(e) => setDescription(e.target.value)} required></textarea>
        
        <button type="submit" disabled={uploading} className="bg-blue-600 text-white py-3 rounded font-bold uppercase hover:bg-blue-700">
          {uploading ? 'Uploading...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default ProductAddScreen