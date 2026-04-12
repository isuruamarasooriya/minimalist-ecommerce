import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../axios'

const ProductScreen = () => {
  const [product, setProduct] = useState({ reviews: [] })
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  
  const { id } = useParams()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product details", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(`/api/products/${id}/reviews`, { rating, comment }, config)
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      fetchProduct()
    } catch (err) {
      alert(err.response && err.response.data.message ? err.response.data.message : err.message)
    }
  }

  const imageUrl = product.image 
    ? (product.image.startsWith('http') ? product.image : `${axios.defaults.baseURL}${product.image}`)
    : undefined

  return (
    <div className="container mx-auto mt-8 p-4">
      <Link to="/" className="bg-gray-800 text-white px-6 py-2 rounded mb-8 inline-block hover:bg-gray-700 transition shadow-sm">
        &larr; Go Back
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={product?.name || 'Product'} 
              className="w-full rounded-xl shadow-lg object-cover"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 rounded-xl shadow-lg animate-pulse"></div>
          )}
        </div>
        
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 border-b pb-4">
            <div className="flex items-center text-yellow-500 font-bold text-xl">
              ★ {product.rating ? product.rating.toFixed(1) : 0}
            </div>
            <span className="text-gray-500 text-sm">({product.numReviews} Reviews)</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <span className={`text-sm font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-3xl font-semibold text-blue-600">
            Rs. {product.price}
          </p>
          
          <p className="text-gray-600 leading-relaxed text-lg italic">
            {product.description}
          </p>
          
          <div className="mt-4">
            {userInfo && userInfo.isAdmin ? (
              <div className="bg-gray-200 text-gray-600 px-8 py-4 text-center rounded-lg uppercase font-bold w-full md:w-auto cursor-not-allowed">
                Admins Cannot Place Orders
              </div>
            ) : (
              <>
                {product.countInStock > 0 && (
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-700 font-semibold">Quantity:</span>
                    <select 
                      value={qty} 
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {product.countInStock > 0 ? (
                  <button 
                    onClick={addToCartHandler} 
                    className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition uppercase font-bold w-full md:w-auto shadow-md"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button disabled className="bg-gray-400 text-white px-8 py-4 rounded-lg uppercase font-bold w-full md:w-auto cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-10">
        <div>
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">Customer Reviews</h2>
          {product.reviews.length === 0 && <p className="text-gray-500 italic">No reviews for this product yet.</p>}
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-gray-900">{review.name}</strong>
                  <div className="text-yellow-500 font-bold">★ {review.rating}</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                <p className="text-[10px] text-gray-400 mt-3 uppercase font-bold tracking-widest">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">Write a Review</h2>
          {!userInfo ? (
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-blue-800 text-sm font-medium">
              Please <Link to="/login" className="font-bold underline decoration-2">Sign In</Link> to share your thoughts on this product.
            </div>
          ) : userInfo.isAdmin ? (
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold text-center uppercase tracking-wider">
              Administrators cannot submit product reviews.
            </div>
          ) : (
            <form onSubmit={submitHandler} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-inner">
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Rating</label>
                <select 
                  className="w-full border-2 border-white p-3 rounded-xl outline-none focus:border-black transition bg-white shadow-sm"
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  <option value="">Select Score...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Your Experience</label>
                <textarea 
                  className="w-full border-2 border-white p-3 rounded-xl outline-none focus:border-black transition bg-white shadow-sm resize-none"
                  rows="4"
                  placeholder="What did you like or dislike?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-black text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg w-full">
                Post Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductScreen