import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'

const CheckoutForm = ({ orderId, userInfo }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      
      const { data: { clientSecret } } = await axios.post(
        `http://localhost:5000/api/orders/${orderId}/pay-stripe`, 
        {}, 
        config
      )

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: userInfo.name, email: userInfo.email }
        }
      })

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`)
        setProcessing(false)
      } else {
        await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, payload.paymentIntent, config)
        setSucceeded(true)
        setProcessing(false)
        window.location.reload()
      }
    } catch (err) {
      setError(err.message)
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="border-2 border-gray-100 p-5 rounded-xl mb-6 bg-gray-50">
        <CardElement 
          options={{ 
            style: { 
              base: { 
                fontSize: '14px', 
                color: '#000', 
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                '::placeholder': { color: '#aab7c4' }
              },
              invalid: { color: '#ef4444' }
            } 
          }} 
        />
      </div>
      
      <button
        type="submit"
        disabled={processing || succeeded || !stripe}
        className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed text-xs"
      >
        {processing ? 'Processing...' : 'Confirm Payment'}
      </button>

      {error && <div className="text-red-500 text-xs font-black uppercase tracking-widest mt-4 text-center">{error}</div>}
    </form>
  )
}

export default CheckoutForm