import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        width: '160px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.2s ease',
        cursor: 'pointer',
        margin: '8px',
        display: 'inline-block',
        verticalAlign: 'top',
        ':hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <img
        src={product.imageUrl || 'https://via.placeholder.com/120'}
        alt={product.name}
        style={{
          width: '100%',
          height: '100px',
          objectFit: 'contain',
          borderRadius: '6px',
          marginBottom: '8px',
        }}
      />
      <h3
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1a202c',
          margin: '0 0 4px 0',
          lineHeight: '1.2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {product.name}
      </h3>
      <p
        style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: '0 0 8px 0',
          lineHeight: '1.4',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {product.category.join(', ')}
      </p>
      <p
        style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#00cc44',
          margin: '0 0 8px 0',
        }}
      >
        ₹{product.sellingPrice}
      </p>
      <button
        style={{
          width: '100%',
          backgroundColor: '#00cc44',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '8px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: '#00b33c',
          },
        }}
        onClick={() => alert(`Added ${product.name} to cart`)}
      >
        Add
      </button>
    </div>
  );
};

export default ProductCard;