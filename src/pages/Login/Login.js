import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import UserAuth from '../../components/UserAuth/UserAuth';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('login/', { email, password });
  
      const { access, refresh,user } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
  
      const profileRes = await api.get('profile/', {
        headers: { Authorization: `Bearer ${access}` },
      });
  
      const profile = profileRes.data;
      localStorage.setItem('profile', JSON.stringify(profile));
      login({ accessToken: access, profile });
  
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Invalid email or password');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <UserAuth>
      <div className='d-flex flex-column p-3 align-items-start'>
        <div className='pb-1' style={{ fontSize: "12px" }}> Welcome Back</div>
        <div className='fs-4 fw-semibold ml-1 pb-3'>Login To Your Account</div>

        <label className='input_label'>Email</label>
        <input className='user-input ' value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className='input_label'>Password</label>
        <div className="password-input-container">
          <input
            className='user-input password'
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

        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}

        {/* <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => navigate('/forgot-password')}>Forgot Password?</button> */}

        <button
          className='btn btn-dark my-3'
          style={{ width: "100%" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status"></div>
          ) : (
            "Continue"
          )}
        </button>


        <div className="or-container">
          <span className="line"></span>
          <span className="fs-5 fw-semibold mx-2">or</span>
          <span className="line"></span>
        </div>

        {/* <button className="btn my-2 social-button" style={{ ...socialBtnStyle }}>
          <img src="/google-logo.png" alt="Google Logo" className="social-logo" />
          Sign up with Google
        </button>

        <button className="btn my-2 social-button" style={{ ...socialBtnStyle }}>
          <img src="/fb-logo.png" alt="Facebook Logo" className="social-logo" />
          Sign up with Facebook
        </button>

        <button className="btn my-2 social-button" style={{ ...socialBtnStyle }}>
          <img src="/apple-logo.jpg" alt="Apple Logo" className="social-logo" />
          Sign up with Apple
        </button> */}

        <p style={{ marginLeft: "90px", marginTop: "20px" }} className='newHere'>
          New Here?
          <button style={{ backgroundColor: "transparent", border: "none", marginLeft: "5px", textDecoration: "underline" }} className='fw-semibold' onClick={() => navigate('/signup')}>SIGN UP HERE</button>
        </p>
      </div>
    </UserAuth>
  );
};

const socialBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #bdbdbd",
  width: "100%",
  backgroundColor: "white",
  color: "#bdbdbd",
  fontSize: "14px",
  gap: "20px"
};

export default Login;
