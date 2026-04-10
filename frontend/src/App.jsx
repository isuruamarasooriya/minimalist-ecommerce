import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductListScreen from './screens/adminpages/ProductListScreen'
import ProductAddScreen from './screens/adminpages/ProductAddScreen'
import ProductEditScreen from './screens/adminpages/ProductEditScreen'
import OrderListScreen from './screens/adminpages/OrderListScreen'
import UserListScreen from './screens/adminpages/UserListScreen'
import UserOrdersScreen from './screens/UserOrdersScreen'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route path="/admin/product/add" element={<ProductAddScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path='/myorders' element={<UserOrdersScreen />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App