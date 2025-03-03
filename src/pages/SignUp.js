import React from 'react'
import UserAuth from '../components/UserAuth/UserAuth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate=useNavigate();
    return (
        <UserAuth>
            <div className='d-flex flex-column m-3 p-4 align-items-start'>
                <div className='pb-1' style={{ fontSize: "12px" }}> LET'S GET YOU STARTED</div>
                <div className='fs-4 fw-semibold ml-1 pb-3'>Create an Account</div>
                <label className='input-label'>Your Name</label>
                <input className='user-input' />
                <label>Email</label>
                <input className='user-input' />
                <label>Password</label>
                <input className='user-input' />
                <button className='btn btn-dark my-3' style={{ width: "100%" }}>Get Started</button>
                <div className='fs-5 fw-semibold'>or</div>
                <button className="btn my-2" style={{ border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px" }} >SignUp with Google</button>
                <button className="btn my-2" style={{ border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px" }}>SignUp with Facebook</button>
                <p>Already have an account?
                    <button style={{ backgroundColor: "transparent", border: "none" }} className='fw-semibold' onClick={()=>{navigate('/login')}}>LOGIN HERE</button>
                </p>


            </div>
        </UserAuth>
    )
}

export default SignUp
