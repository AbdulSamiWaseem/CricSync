import React from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './start.css'; 

const Start = () => {
  const navigate = useNavigate();
  
  return (
    <div className='start-container'>
      <div className='start-buttons'>
        <button 
          className='start-btn fs-4' 
          onClick={() => { navigate('/login'); }}>
          Login
        </button>
        <button 
          className='start-btn fs-4' 
          onClick={() => { navigate('/signup'); }}>
          Sign Up
        </button>
      </div>
      <img src={Logo} alt="Logo" className='start-logo' />
      <div className='start-text fs-3'>
        Revolutionizing the Fixtures of Local Cricket Matches...
      </div>
    </div>
  );
}

export default Start;
