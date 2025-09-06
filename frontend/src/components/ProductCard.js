// src/components/ProductCard.js

import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => {
  // This handler will stop the click from propagating to the parent Link
  const handleAddToCartClick = (e) => {
    e.preventDefault(); // Prevents the Link's default navigation
    e.stopPropagation(); // Stops the event from bubbling up to the Link

    // Call the function passed from the parent component
    onAddToCart(product.id);
  };

  return (
    <div className="group relative">
      <Link
        to={`/product/${product.id}`}
        className="block no-underline text-gray-800"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 h-full flex flex-col">
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-500 text-sm relative overflow-hidden">
            {product.primary_image ? (
              <img
                src={product.primary_image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span>No Image Available</span>
            )}
          </div>

          <div className="p-5 flex-grow flex flex-col justify-between">
            <div>
              <h3
                className="text-lg font-semibold text-gray-800 mb-2 leading-snug truncate"
                title={product.title}
              >
                {product.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700 capitalize">
                  {product.category_name}
                </span>
                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                  {product.condition.replace('-', ' ')}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-3 mb-4">
                by {product.seller_name}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-2xl text-green-600 font-bold">
                ${parseFloat(product.price).toFixed(2)}
              </p>

              {/* --- ADD TO CART BUTTON --- */}
              <button
                onClick={handleAddToCartClick}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;