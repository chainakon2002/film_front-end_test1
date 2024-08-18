import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Productpict = () => {
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [products, setProducts] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchOrdersAddressesProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Fetch orders
                const ordersResponse = await axios.get(`http://localhost:8889/auth/userorders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(ordersResponse.data);

                // Fetch addresses
                const addressesResponse = await axios.get(`http://localhost:8889/auth/useraddress`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAddresses(addressesResponse.data);

                // Fetch products
                const productsResponse = await axios.get(`http://localhost:8889/auth/getproduct`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(productsResponse.data);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOrdersAddressesProducts();
    }, [userId]);

    return (
        <div className="flex flex-col justify-center items-center py-10">
            <div className="mb-6">
                <p className="text-4xl font-semibold text-center">รายการสั่งซื้อ</p>
            </div>

            <div className="container mx-auto mt-10 p-4 rounded-lg bg-white shadow-lg">
                {orders.map(order => {
                    const address = addresses.find(addr => addr.id === order.addressId) || {};
                    const product = products.find(prod => prod.id === order.productId) || {};

                    return (
                        <div key={order.id} className="border-b border-gray-200 py-4">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                            
                            <div className="flex items-center space-x-4"> {/* Flex container */}
    <img 
        src={product.file} 
        alt="" 
        className="w-24 h-24 object-cover"  // Tailwind classes for width, height, and object fit
    />
    <div>
        <p className="text-lg font-semibold">{product.ItemName || order.productname}</p>
        <p className="text-gray-600">จำนวน: {order.amount} ชิ้น</p>
        <p className="text-gray-600">ราคา: {order.price} บาท</p>
        <p className="text-gray-600">ที่อยู่: {address.province}, {address.district}</p>
        {/* <p className="text-gray-600">รายละเอียดสินค้า: {product.description || 'ไม่มีรายละเอียด'}</p> */}
    </div>
</div>


<div className="flex items-center">
    <p className="text-lg font-semibold"> {order.status}</p>
    <button
        className="bg-red-500 text-white px-4 py-2 rounded-xl"
        style={{ marginLeft: '40px' }}  
        onClick={() => handleDelete(order.id)}
    >
        ยกเลิก
    </button>
</div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Productpict;
