import React from 'react'
import UserAuth from '../components/UserAuth/UserAuth'

const ForgotPassword = () => {
  return (
    <UserAuth>
        <div className='d-flex flex-column m-3 p-3 align-items-start'>
            <div className='fs-4 fw-semibold ml-1 pb-3'>Forget Password</div>
            <label>Email</label>
            <input className='user-input' />
            <button className='btn btn-dark my-3' style={{width:"100%"}}>Reset</button>
          

        </div>
    </UserAuth>
  )
}

export default ForgotPassword
