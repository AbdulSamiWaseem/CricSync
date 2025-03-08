import React from 'react'
import UserAuth from '../components/UserAuth/UserAuth'
import { useNavigate } from 'react-router-dom'
import './Login.css'



const Login = () => {
  const navigate=useNavigate();
  return (
    <UserAuth>
      <div className='d-flex flex-column p-3 align-items-start'>
        <div className='pb-1' style={{ fontSize: "12px" }}> Welcome Back</div>
        <div className='fs-4 fw-semibold ml-1 pb-3'>Login To Your Account</div>
        <label>Email</label>
        <input className='user-input' />
        <label>Password</label>
        <input className='user-input' />
        <button style={{ backgroundColor: "transparent", border: "none" }} onClick={()=>{navigate('/forgot-password')}}>Forgot Password ?</button>
        <button className='btn btn-dark my-3' style={{ width: "100%" }} onClick={()=>{navigate('/dashboard')}}>Continue</button>
        <div className="or-container">
        <span className="line"></span>
        <span className="fs-5 fw-semibold mx-2">or</span>
        <span className="line"></span>
        </div>

        <button className="btn my-2 social-button" style={{ display:"flex", alignItems:"center",justifyContent:"center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap:"20px"}} >
        <img src="/google-logo.png" alt="Google Logo" className="social-logo" />
        Sign up with Google
        </button>

        <button className="btn my-2 social-button" style={{ display:"flex", alignItems:"center",justifyContent:"center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap:"20px"}} >
        <img src="/fb-logo.png" alt="Facebook Logo" className="social-logo" />
        Sign up with Facebook
        </button>

        <button className="btn my-2 social-button" style={{ display:"flex", alignItems:"center",justifyContent:"center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap:"20px"}} >
        <img src="/apple-logo.jpg" alt="Apple Logo" className="social-logo" />
        Sign up with Apple
        </button>

        <p style={{marginLeft:"90px",marginTop:"20px"}}>New Here?
        <button style={{ backgroundColor: "transparent", border: "none", marginLeft: "5px", textDecoration: "underline"}} className='fw-semibold' onClick={()=>{navigate('/signup')}}>SIGN UP HERE</button>
        </p>
       
      </div>
    </UserAuth>
  )
}



export default Login
