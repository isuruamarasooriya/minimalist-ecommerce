import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const ProductEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
      setName(data.name)
      setPrice(data.price)
      setCategory(data.category)
      setCountInStock(data.countInStock)
      setDescription(data.description)
    }
    fetchProduct()
  }, [id])

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    if (image) formData.append('image', image)
    formData.append('category', category)
    formData.append('countInStock', countInStock)
    formData.append('description', description)

    try {
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, config)
      setLoading(false)
      navigate('/admin/productlist')
    } catch (err) {
      setLoading(false)
      alert('Error updating product')
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-2xl">
      <Link to="/admin/productlist" className="text-sm font-bold uppercase border-b-2 border-black mb-10 inline-block hover:text-gray-600 transition">
        ← Back to List
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mt-5">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Edit Product</h1>
        
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Product Name</label>
            <input type="text" value={name} className="border-2 border-gray-100 p-4 rounded-xl focus:border-black outline-none transition" onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Price (LKR)</label>
              <input type="number" value={price} className="border-2 border-gray-100 p-4 rounded-xl focus:border-black outline-none transition" onChange={(e) => setPrice(Number(e.target.value))} required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Stock Count</label>
              <input type="number" value={countInStock} className="border-2 border-gray-100 p-4 rounded-xl focus:border-black outline-none transition" onChange={(e) => setCountInStock(Number(e.target.value))} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Product Image (Leave blank to keep current)</label>
            <input type="file" className="border-2 border-dashed border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Category</label>
            <input type="text" value={category} className="border-2 border-gray-100 p-4 rounded-xl focus:border-black outline-none transition" onChange={(e) => setCategory(e.target.value)} required />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Description</label>
            <textarea value={description} className="border-2 border-gray-100 p-4 rounded-xl focus:border-black outline-none transition resize-none" rows="4" onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          
          <button type="submit" disabled={loading} className="bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg mt-4 disabled:bg-gray-400">
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductEditScreen