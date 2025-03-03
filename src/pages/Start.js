import React from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const Start = () => {
  const navigate=useNavigate();
  return (
    <div className='p-4 d-flex flex-column align-items-center'>
        <div className='d-flex flex-row w-100 justify-content-end'>
            <button style={{backgroundColor:"transparent",border:"none"}} className='fs-4 px-4' onClick={()=>{navigate('/login')}}>Login</button>
            <button style={{backgroundColor:"transparent",border:"none"}} className='fs-4' onClick={()=>{navigate('/signup')}}>Sign Up</button>
        </div>
        <img src={Logo} width="60%"></img>
        <div className='fs-3'>Revolutionizing the Fixtures of Local Cricket Matches...</div>
    </div>
  )
}

export default Start
