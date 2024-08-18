import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    lastname: '',
    phone: '',
    province: '',
    district: '', // Use the correct field name
    tambon: '',
    housenumber: '',
    village: '',
    zipcode: '',
    other: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8889/auth/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);

        // Fetch user addresses after getting user data
        const addressResponse = await axios.get(`http://localhost:8889/auth/useraddress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAddresses(addressResponse.data);
        console.log('Fetched address:', addressResponse.data); // Verify the address data
      } catch (error) {
        console.error('Error fetching user or address:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8889/auth/addUserAddress`, newAddress, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(prevAddresses => [...prevAddresses, response.data]);
      setNewAddress({
        name: '',
        lastname: '',
        phone: '',
        province: '',
        district: '',
        tambon: '',
        housenumber: '',
        village: '',
        zipcode: '',
        other: ''
      });
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {user && (
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">User Profile</h1>
          <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
            <h2 className="text-xl font-medium text-gray-800 mb-2">ที่อยู่ {index + 1}</h2>
            <p className="text-gray-600"><strong>ชื่อ:</strong> {address.name}</p>
            <p className="text-gray-600"><strong>เบอร์โทร:</strong> {address.phone}</p>
            <p className="text-gray-600"><strong>จังหวัด:</strong> {address.province}</p>
            <p className="text-gray-600"><strong>อำเภอ:</strong> {address.district}</p>
            <p className="text-gray-600"><strong>ตำบล:</strong> {address.tambon}</p>
            <p className="text-gray-600"><strong>เลขที่:</strong> {address.housenumber}</p>
            <p className="text-gray-600"><strong>หมู่ที่:</strong> {address.village}</p>
            <p className="text-gray-600"><strong>รหัสไปรษณีย์:</strong> {address.zipcode}</p>
            <p className="text-gray-600"><strong>รายละเอียด:</strong> {address.other}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No addresses found</p>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Add New Address</h2>
        <input 
          type="text" 
          name="name" 
          value={newAddress.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="lastname" 
          value={newAddress.lastname} 
          onChange={handleChange} 
          placeholder="Lastname" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="phone" 
          value={newAddress.phone} 
          onChange={handleChange} 
          placeholder="Phone" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="province" 
          value={newAddress.province} 
          onChange={handleChange} 
          placeholder="Province" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="district" // Use the correct field name
          value={newAddress.district} 
          onChange={handleChange} 
          placeholder="District" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="tambon" 
          value={newAddress.tambon} 
          onChange={handleChange} 
          placeholder="Tambon" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="housenumber" 
          value={newAddress.housenumber} 
          onChange={handleChange} 
          placeholder="House Number" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="village" 
          value={newAddress.village} 
          onChange={handleChange} 
          placeholder="Village" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="zipcode" 
          value={newAddress.zipcode} 
          onChange={handleChange} 
          placeholder="Zipcode" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="other" 
          value={newAddress.other} 
          onChange={handleChange} 
          placeholder="Other Details" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          เพิ่มที่อยู่
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
