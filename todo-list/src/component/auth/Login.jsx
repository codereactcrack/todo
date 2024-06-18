import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth, db, googleProvider } from '../../services/database';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GoogleIcon from '@mui/icons-material/Google';
import '../../component/auth/css/Login.css';
import Logo from '../../assets/logo.webp';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const userCollectionRef = collection(db,'users');

  async function googleLoginHandler() {
    try {
      const userInfo = await signInWithPopup(auth, googleProvider);
      setCurrentUser(userInfo.user);
      const q = query(userCollectionRef,where('email','==',userInfo.user.email));
      const querySnapShot =await getDocs(q);
      if(querySnapShot.empty){
        await addDoc(userCollectionRef,{
          userName:userInfo.user.displayName,
          email:userInfo.user.email,
          profilePhoto:userInfo.user.photoURL,
          todoList:[]
        })
      }
      navigate('/home');
    } catch (error) {
      alert(error.value, ' / ', error.message);
      console.log(error);
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
