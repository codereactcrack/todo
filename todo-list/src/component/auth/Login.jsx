import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth, googleProvider } from '../../services/database';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GoogleIcon from '@mui/icons-material/Google';
import '../../component/auth/css/Login.css';
import Logo from '../../assets/logo.webp';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  async function googleLoginHandler() {
    try {
      const userInfo = await signInWithPopup(auth, googleProvider);
      setCurrentUser(userInfo.user);
      navigate('/home');
    } catch (error) {
      alert(error.value, ' / ', error.message);
    }
  }

  return (
    <div className='login-container'>
      <div className='login-content'>
        <img src={Logo} alt='logo' className='login-logo' />
        <button className='login-button' onClick={googleLoginHandler}>
          <GoogleIcon className='google-icon' /> GOOGLE LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
