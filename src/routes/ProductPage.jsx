// src/routes/ProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  return <h1>Product Page for product {id}</h1>;
};

export default ProductPage;