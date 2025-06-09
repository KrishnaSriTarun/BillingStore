import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/MenuBar/MenuBar'
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageCategory from './Pages/ManageCategory/ManageCategory';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import ManageItems from './Pages/ManageItems/ManageItems';
import Explore from './Pages/Explore/Explore';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login/Login';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const location=useLocation();
  const {auth}=useContext(AppContext);

  const LoginRoute=({element})=>{
    if(auth.token){
      return <Navigate to="/dashboard" replace/>
    }
    return element;
  }

  const ProtectedRoute=({element,allowedRoles})=>{
    if(!auth.token){
        return <Navigate to="/login" replace/>
    }
    if(allowedRoles && !allowedRoles.includes(auth.role)){
      return <Navigate to="/dashboard" replace/>
    }
    return element;
  }
  return (
    <div>
      {location.pathname !== '/login' && <MenuBar/>}
    <Toaster/>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/explore' element={<Explore/>}/>
      {/* Admin Routes */}
      <Route path='/category' element={<ProtectedRoute element={<ManageCategory/>} allowedRoles={['ROLE_ADMIN']}/>}/>
      <Route path='/users' element={<ProtectedRoute element={<ManageUsers/>} allowedRoles={['ROLE_ADMIN']}/>}/>
      <Route path='/items' element={<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']}/>}/>

      <Route path='/login' element={<LoginRoute element={<Login />}/>}/>
      <Route path='/orders' element={<OrderHistory/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </div>
  )
}

export default App
