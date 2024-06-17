import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { signOut } from 'firebase/auth';
import {auth} from '../services/database'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  function logoutHandler(){
    signOut(auth);
    localStorage.clear();
    navigate('/')
  }

  return (
    <div>
      {currentUser && <div>hii {currentUser.displayName}</div>}
      <button onClick={logoutHandler}>
        LOGOUT
      </button>
    </div>
  )
}

export default Home