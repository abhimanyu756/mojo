import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          {product.primary_image ? (
            <img 
              src={product.primary_image} 
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span>No Image Available</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <div className="product-meta">
            <span className="product-category">{product.category_name}</span>
            <span className="product-condition">{product.condition}</span>
          </div>
          <p className="product-seller">by {product.seller_name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;