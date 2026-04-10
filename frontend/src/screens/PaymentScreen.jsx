import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const shippingAddress = localStorage.getItem('shippingAddress')
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [navigate])

  // Default එක කෙලින්ම 'Stripe' කියලා දුන්නා
  const [paymentMethod, setPaymentMethod] = useState('Stripe')

  const submitHandler = (e) => {
    e.preventDefault()
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-xl">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter text-center">Payment Method</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-4 text-gray-400">
              Select Method
            </h2>

            <label className={`flex items-center gap-6 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'Stripe' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}>
              <input
                type="radio"
                className="w-5 h-5 accent-black cursor-pointer"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div className="flex flex-col">
                <span className="font-black text-lg text-gray-800 uppercase tracking-wide">Credit Card (Stripe)</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Pay securely with your card</span>
              </div>
            </label>
            
            {/* අනාගතයේදී PayPal එකතු කරනවා නම් මෙතනට කේතය දාන්න පුළුවන් */}

          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl text-xs mt-4"
          >
            Continue To Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentScreen