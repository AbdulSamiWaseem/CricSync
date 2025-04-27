import React, { useState } from 'react';
import UserAuth from '../../components/UserAuth/UserAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import './signUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                // Handle successful signup (e.g., save token, redirect)
                console.log('User created successfully:', response.data);
                navigate('/login');  // Redirect to login page after successful signup
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <UserAuth>
            <div className='d-flex flex-column m-3 p-4 align-items-start'>
                <div className='pb-1' style={{ fontSize: "12px" }}>LET'S GET YOU STARTED</div>
                <div className='fs-4 fw-semibold ml-1 pb-3'>Create an Account</div>
                <label className='input-label'>Your Name</label>
                <input
                    className='user-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className='user-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className='user-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button className='btn btn-dark my-3' style={{ width: "100%" }} onClick={handleSignUp}>
                    Get Started
                </button>
                <div className="or-container">
                    <span className="line"></span>
                    <span className="fs-5 fw-semibold mx-2">or</span>
                    <span className="line"></span>
                </div>

                <button className="btn my-2 social-button" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap: "20px" }}>
                    <img src="/google-logo.png" alt="Google Logo" className="social-logo" />
                    Log in with Google
                </button>

                <button className="btn my-2 social-button" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap: "20px" }}>
                    <img src="/fb-logo.png" alt="Facebook Logo" className="social-logo" />
                    Log in with Facebook
                </button>

                <button className="btn my-2 social-button" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #bdbdbd", width: "100%", backgroundColor: "white", color: "#bdbdbd", fontSize: "14px", gap: "20px" }}>
                    <img src="/apple-logo.jpg" alt="Apple Logo" className="social-logo" />
                    Log in with Apple
                </button>

                <p style={{ marginLeft: "50px", marginTop: "10px" }}>
                    Already have an account?
                    <button style={{ backgroundColor: "transparent", border: "none", marginLeft: "2px", textDecoration: "underline" }} className='fw-semibold' onClick={() => { navigate('/login') }}>LOGIN HERE</button>
                </p>
            </div>
        </UserAuth>
    );
};

export default SignUp;
