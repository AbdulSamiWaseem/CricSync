import React, { Children } from 'react'
import './userAuth.css'


const UserAuth = ({children}) => {
  return (
    <div className='userAuth d-flex flex-row p-3' >
      <div className='section-1'>
      <img src="bg-img.png" alt="background image" className="bg-img-class" />
        <p className='fw-semibold' style={{fontSize:"50px"}}>CricSync</p>
        <p className='fs-3 fw-semibold'>Building the Future Of Local Cricket</p>
      </div>
      <div className='child' style={{width:"30%"}}>
        <div className='cards'>
          {children}
        </div>

      </div>
    </div>
  )
}

export default UserAuth
