import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block no-underline text-gray-800"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
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

        <div className="p-5">
          <h3
            className="text-lg font-semibold text-gray-800 mb-2 leading-snug truncate"
            title={product.title}
          >
            {product.title}
          </h3>
          <p className="text-2xl text-green-600 font-bold mb-2">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700 capitalize">
              {product.category_name}
            </span>
            <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
              {product.condition.replace('-', ' ')}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-3">
            by {product.seller_name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;