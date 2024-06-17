import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

const Home = () => {
  const {currentUser} = useContext(UserContext);
  return (
    <div>
      {currentUser && <div>hii {currentUser.displayName}</div>}
    </div>
  )
}

export default Home