

import axios from 'axios';
import { useEffect, useState } from 'react';
import './css/UserHome.css';
import Promote from "../layout/Promote";
import { Link } from 'react-router-dom';

export default function UserHome() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getproduct', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const filteredProducts = product.filter(item =>
    item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-home-container">
      <div className='poster'>
        <Promote />
        <h3 className="productfi">รายการสินค้า</h3>
         {/* Updated Search Bar */}
         <div id="search-bar" style={{ width: '550px' }}className="w-120 bg-white rounded-md shadow-lg z-10 mx-auto my-4">
          <form className="flex items-center justify-center p-2">
            <input 
              type="text" 
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            
          </form>
        </div>

        
      </div>

      {/* Product list */}
      {filteredProducts.map((item) => (
        <div key={item.id} className="product-item flex justify-center">
          <Link to={`/product/${item.id}`}>
            <img src={item.file} alt="" />
            <hr />
            <h3 className="font-semibold product-title">{item.ItemName}</h3>
            <p className="font-semibold product-price">ราคา: {item.price.toLocaleString()} บาท</p>
          </Link>
          <div className="button-group">
            {/* Add buttons or actions if needed */}
          </div>
        </div>
      ))}
    </div>
  );
}
