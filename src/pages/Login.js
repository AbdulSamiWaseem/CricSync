import React from 'react'
import UserAuth from '../components/UserAuth/UserAuth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate();
  return (
    <UserAuth>
      <div className='d-flex flex-column m-3 p-3 align-items-start'>
        <div className='pb-1' style={{ fontSize: "12px" }}> Welcome Back</div>
        <div className='fs-4 fw-semibold ml-1 pb-3'>Login To Your Account</div>
        <label>Email</label>
        <input className='user-input' />
        <label>Password</label>
        <input className='user-input' />
        <button style={{ backgroundColor: "transparent", border: "none" }} onClick={()=>{navigate('/forgot-password')}}>Forgot Password ?</button>
        <button className='btn btn-dark my-3' style={{ width: "100%" }} onClick={()=>{navigate('/dashboard')}}>Continue</button>
        <div className='fs-5 fw-semibold'>or</div>
        <button className="btn my-2" style={{ border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px" }} >SignUp with Google</button>
        <button className="btn my-2" style={{ border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px" }}>SignUp with Facebook</button>
        <p>New Here?
          <button style={{ backgroundColor: "transparent", border: "none" }} className='fw-semibold' onClick={()=>{navigate('/signup')}}>SIGN UP HERE</button>
        </p>


      </div>
    </UserAuth>
  )
}

export default Login
