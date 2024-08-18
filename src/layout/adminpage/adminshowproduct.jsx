// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import './adminhome.css'
// import axios from 'axios';



  
  


// export default function adminhome() {
//   const [menutems, setMenutems] = useState([]);

//   useEffect(() => {
//     const fetchMenutems = async () => { // ปรับเปลี่ยนชื่อฟังก์ชันเป็น fetchMenutems
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8889/auth/getmenutems', {
//           headers: { Authorization: `Bearer ${token}` } 
//         });
        
//         setMenutems(response.data);
//       } catch (error) {
//         console.error('Error fetching menutems:', error);
//       }
//     };

//     fetchMenutems();
//   }, []); 


//   function ReseverdItem({ item }) {
//     const { Deletepro } = useContext(deletepro);
  
//     const hdlDelete = () => {
//       deleteReserved(item.id);
//       history.go(0);
//       alert("ลบสินค้าแล้ว");
//     };
//   }

//   return (
// <div className="  ">
//   <div className="flex flex-col justify-center items-center py-10">
//     <div className="">
//       <p className="text-[50px] font-semibold text-center">Admin</p>
//     </div>
//                   <div className="but">
//         {/* ปุ่มหรืออื่น ๆ ที่ต้องการเพิ่ม */}
//         <Link to={`/Add`}>
//         <button className="text-blue-500 font-semibold">เพิ่มสินค้า</button>
//         </Link>
//       </div>
//     <div className="container mx-auto mt-10 p-4">
//   {menutems.map((item) => (
//     <div key={item.id} className=" border p-4">

//         <div className="flex items-center justify-between border-b border-gray-200 pb-9 mb-2">
//         <div className='flex items-center'>
//         <img src={item.file} alt="" className="w-20 h-20 rounded-md mr-4" />
//         <div>
//               <p className="font-semibold">{item.ItemName}</p>
              
//             </div>
//         </div>
//         <div className="button-group">
//         {/* ปุ่มหรืออื่น ๆ ที่ต้องการเพิ่ม */}
//         <button  className="text-red-500 font-semibold" onClick={hdlDelete}>ลบ</button>
 
//       </div>
//       </div>
      
      
//     </div>
//   ))}
// </div>

//   </div>
// </div>


//   )
// }



import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dashboard from './adminpage';

export default function AdminHome() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getproduct', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMenuItems(menuItems.filter(item => item.id !== id));
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center py-10">
        <div className="">
          <p className="text-[50px] font-semibold text-center">Admin</p>
          
        </div>
        <div className="but">
          <Link to={`/Add`}>
            <button className="text-blue-500 font-semibold">เพิ่มสินค้า</button>
          </Link>
        </div>
        <div className="container mx-auto mt-10 p-4 rounded-lg ">
          {menuItems.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-9 mb-2">
                <div className='flex items-center'>
                  <img src={item.file} alt="" className="w-20 h-20 rounded-md mr-4" />
                  <div>
                    <p className="font-semibold">{item.ItemName}</p>
                  </div>
                </div>
                <div className="button-group">
                  <button className="text-red-500 font-semibold" onClick={() => handleDelete(item.id)}>ลบ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}

