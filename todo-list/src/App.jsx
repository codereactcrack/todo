import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Login from './component/auth/Login'
import Home from './home/Home'
import { useContext } from 'react'
import UserContext from './context/UserContext'

function App() {

  const {currentUser} = useContext(UserContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Login />} />
        {currentUser.displayName &&
          <Route path='/home' element={<Home />} /> }
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
