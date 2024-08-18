import React from 'react';


function Cart() {
  return (
    <div className="container mx-auto mt-10 p-4">
      <p className="font-semibold text-2xl text-blue-500 text-center mb-4">Cart</p>
      <div className="bg-white p-4 rounded shadow-md">
        {/* เพิ่มส่วนของรายการสินค้าที่อยู่ในตะกร้า */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
          <div className="flex items-center">
            <img src="/src/assets/HPSP2_GEO_TH.jpg" alt="Product" className="w-20 h-20 rounded-md mr-4" />
            <div>
              <p className="font-semibold">Microsoft 365 Personal</p>
              <p className="text-gray-600">Price: 2,390</p>
            </div>
          </div>
          <div>
            <button className="text-red-500 font-semibold">Remove</button>
          </div>
        </div>
        {/* สิ้นสุดส่วนของรายการสินค้า */}
        <div className="text-right">
          <p className="font-semibold">Total: 2,390</p>
        </div>
        <div className="text-center mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
