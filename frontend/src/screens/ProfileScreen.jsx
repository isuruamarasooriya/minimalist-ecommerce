import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [name, setName] = useState(userInfo ? userInfo.name : '')
  const [email, setEmail] = useState(userInfo ? userInfo.email : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo]) 

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.put(
          '/api/users/profile',
          { id: userInfo._id, name, email, password, currentPassword },
          config
        )
        setMessage('Profile updated successfully!')
        localStorage.setItem('userInfo', JSON.stringify(data))
        setIsEdit(false)
        setPassword('')
        setConfirmPassword('')
        setCurrentPassword('')
        
      } catch (err) {
        setMessage(err.response && err.response.data.message ? err.response.data.message : err.message)
      }
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-xl">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
        <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter text-center">My Profile Settings</h2>
        
        {message && (
          <div className={`p-4 rounded-xl text-xs font-black mb-8 border uppercase text-center ${message.includes('success') ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
            {message}
          </div>
        )}

        {!isEdit ? (
          <div className="flex flex-col gap-8 py-4">
            <div className="border-b pb-4">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Full Name</label>
              <p className="text-xl font-bold text-gray-800">{name}</p>
            </div>
            <div className="border-b pb-4">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Email Address</label>
              <p className="text-xl font-medium text-gray-600">{email}</p>
            </div>
            <button 
              onClick={() => { setIsEdit(true); setMessage(null); }}
              className="mt-6 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 shadow-xl"
            >
              Update Profile Details
            </button>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none transition font-bold text-sm bg-gray-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none transition font-bold text-sm bg-gray-50" />
            </div>

            <div className="h-px bg-gray-100 my-2"></div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-800 tracking-widest ml-1">Current Password *</label>
              <input type="password" placeholder="Verify identity to save changes" onChange={(e) => setCurrentPassword(e.target.value)} className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none transition font-bold text-sm bg-gray-50 shadow-inner" required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">New Password (Optional)</label>
              <input type="password" placeholder="Leave blank to keep current" onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none transition font-bold text-sm bg-gray-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Confirm New Password</label>
              <input type="password" placeholder="Repeat new password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-black outline-none transition font-bold text-sm bg-gray-50" />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button type="submit" className="bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg">Save Changes</button>
              <button type="button" onClick={() => setIsEdit(false)} className="text-gray-400 py-2 font-bold uppercase tracking-widest text-[10px] hover:text-red-500 transition text-center">Cancel Edit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfileScreen