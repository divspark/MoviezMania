import { useNavigate } from 'react-router-dom';
import React from 'react'
import { auth } from '../config/firebase';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
    });
    
  }
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between'>
      <img src="Logo.png" alt="Logo" className='w-32'/>
      <div className='flex items-center'>
      <img src="userIcon.png" alt="user-icon" className='w-10 h-10 bg-red-600 rounded-full p-1 mr-2'/>
      <button className='font-bold' onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Header