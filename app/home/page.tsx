"use client";

import React, { useState } from 'react';
import styles from './home.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Product {
  name: string;
  description: string;
  price: number;
  sales: number;
  stock: number;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Product[]>([
    // 示例数据，未来可以替换为实际的 API 响应
    // {
    //   name: 'Product A',
    //   description: 'Description For Product A',
    //   price: 100,
    //   sales: 50,
    //   stock: 20,
    // },
    // {
    //   name: 'Product B',
    //   description: 'Description For Product B',
    //   price: 200,
    //   sales: 30,
    //   stock: 10,
    // },{
    //   name: 'Product C',
    //   description: 'Description For Product C',
    //   price: 200,
    //   sales: 30,
    //   stock: 10,
    // },{
    //   name: 'Product D',
    //   description: 'Description For Product D',
    //   price: 200,
    //   sales: 30,
    //   stock: 10,
    // },{
    //   name: 'Product E',
    //   description: 'Description For Product E',
    //   price: 200,
    //   sales: 30,
    //   stock: 10,
    // },{
    //   name: 'Product F',
    //   description: 'Description For Product F',
    //   price: 200,
    //   sales: 30,
    //   stock: 10,
    // },
  ]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.55.190.75:8080/api/search', {
        category: searchTerm
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('search failure', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Search</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Please Enter Keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
        <button className={styles.aiButton} onClick={() => router.replace('/roleSelection')}>AI Recommend</button>
      </form>
      <div className={styles.resultsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>Price: ¥{product.price}</p>
              <p className={styles.productSales}>Sales: {product.sales}</p>
              <p className={styles.productStock}>Stocks: {product.stock}</p>
            </div>
          ))
        ) : (
          <p className={styles.placeholder}>Search Result Display Here...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
