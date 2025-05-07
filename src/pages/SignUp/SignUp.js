import React, { useState } from 'react';
import UserAuth from '../../components/UserAuth/UserAuth';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the styles for the phone input
import './signUp.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
      
        try {
          const response = await api.post('/register/', {
            username,
            email,
            password,
            phone_number
          });
      
          if (response.status === 201) {
            toast.success('Account created successfully!');
            navigate('/login');
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errors = error.response.data;
            const firstError = Object.values(errors)[0][0];
            toast.error(firstError);
          } else {
            toast.error('Something went wrong');
          }
        } finally {
          setLoading(false);
        }
      };
      


    return (
        <UserAuth>
            <div className='d-flex flex-column m-3 p-4 align-items-start'>
                <div className='pb-1' style={{ fontSize: "12px" }}>LET'S GET YOU STARTED</div>
                <div className='fs-4 fw-semibold ml-1 pb-3'>Create an Account</div>

                <label className='input-label input_label'>Your Name</label>
                <input
                    className='user-input'
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className='input_label'>Email</label>
                <input
                    className='user-input'
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className='input_label'>Password</label>
                <div className="password-input-container">
                    <input
                        className='user-input password'
                        placeholder="Enter password"

                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="password-toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>

                <label className='input_label'>Phone Number</label>
                <PhoneInput
                    className='user-input'
                    placeholder="Enter phone number"
                    value={phone_number}
                    onChange={setPhone}
                    defaultCountry="PK"
                />


                <button
                    className='btn btn-dark my-3'
                    style={{ width: "100%" }}
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                    ) : (
                        "Get Started"
                    )}
                </button>


                <div className="or-container">
                    <span className="line"></span>
                    <span className="fs-5 fw-semibold mx-2">or</span>
                    <span className="line"></span>
                </div>

                <p style={{ marginLeft: "50px", marginTop: "10px" }} className='AlreadyAccount'>
                    Already have an account?
                    <button style={{ backgroundColor: "transparent", border: "none", marginLeft: "2px", textDecoration: "underline" }} className='fw-semibold' onClick={() => navigate('/login')}>LOGIN HERE</button>
                </p>
            </div>
        </UserAuth>
    );
};

export default SignUp;
