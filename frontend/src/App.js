import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import MyListings from './pages/MyListings';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
// import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<OrderHistory />} />

            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;