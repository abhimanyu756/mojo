import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react'; // ✨ Import icons from lucide-react

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false); // Close menu on logout
  };

  // Base styles for nav links for consistency
  const navLinkClasses = "text-gray-700 hover:text-green-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors duration-300";
  const mobileNavLinkClasses = "block text-gray-700 hover:text-green-600 hover:bg-gray-100 px-4 py-3 rounded-md font-medium transition-colors duration-300";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-green-600">
              🌱 EcoFinds
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            {/* <Link to="/" className={navLinkClasses}>Browse</Link> */}
            {user ? (
              <>
                <Link to="/add-product" className={navLinkClasses}>Sell Item</Link>
                <Link to="/my-listings" className={navLinkClasses}>My Listings</Link>
                <Link to="/cart" className={navLinkClasses}>Cart</Link>
                <Link to="/orders" className={navLinkClasses}>Orders</Link>
                <Link to="/profile" className={navLinkClasses}>Profile</Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 py-2 px-5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-gradient-to-br from-red-500 to-red-600 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={navLinkClasses}>Login</Link>
                <Link
                  to="/register"
                  className="ml-2 py-2 px-5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-gradient-to-br from-green-500 to-green-600 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-green-600 focus:outline-none">
              {/* ✨ Using Lucide icons */}
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <Link to="/" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Browse</Link> */}
            {user ? (
              <>
                <Link to="/add-product" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Sell Item</Link>
                <Link to="/my-listings" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>My Listings</Link>
                <Link to="/cart" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Cart</Link>
                <Link to="/orders" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Orders</Link>
                <Link to="/profile" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-5 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-gradient-to-br from-red-500 to-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</Link>
                <div className="p-2">
                  <Link
                    to="/register"
                    className="block w-full text-center py-3 px-5 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-gradient-to-br from-green-500 to-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;