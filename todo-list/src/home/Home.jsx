import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/database';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutHandler() {
    signOut(auth);
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className='home-container'>
      <div className='header'>
        <div className='profile-info'>
          <NavLink to='/home'><img src={currentUser.photoURL} alt='profile' className='profile-photo'/></NavLink>
          <div className='profile-name'>{currentUser.displayName}</div>
        </div>
        <div className='heading'>TODO List</div> 
        <div className='logout'>     
          <button className='logout-button' onClick={logoutHandler}>LOGOUT</button>
        </div>
      </div>
      <div className='main-content'>
        <div className='sidebar'>
          <ul>
            <li><NavLink to='/home/list' activeClassName='active-link'>TODO</NavLink></li>
            <li><NavLink to='/home/profile' activeClassName='active-link'>Profile</NavLink></li>
          </ul>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
