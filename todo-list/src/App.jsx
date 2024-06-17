import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Login from './component/auth/Login';
import Home from './home/Home';
import ProtectedRoute from './component/auth/ProtectedRoute';
import TodoList from './todoList/TodoList';
import Profile from './home/Profile';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />}>
          <Route path='list' element={<TodoList/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
