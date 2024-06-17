import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser || !currentUser.emailVerified) {
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;


