import React, { useState } from 'react';
import UserAuth from '../components/UserAuth/UserAuth';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset/', { email });
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      console.error('Reset error:', error);
      setMessage('Failed to send reset email. Please try again.');
    }
  };

  return (
    <UserAuth>
      <div className='d-flex flex-column m-3 p-3 align-items-start'>
        <div className='fs-4 fw-semibold ml-1 pb-3'>Forgot Password</div>
        
        <label>Email</label>
        <input
          className='user-input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your registered email'
        />
        
        <button
          className='btn btn-dark my-3'
          style={{ width: '100%' }}
          onClick={handleReset}
          disabled={!email}
        >
          Reset
        </button>

        {message && <div className='text-muted mt-2'>{message}</div>}
      </div>
    </UserAuth>
  );
};

export default ForgotPassword;
