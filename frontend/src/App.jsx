import { Route, Routes } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/MenuBar/MenuBar'
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageCategory from './Pages/ManageCategory/ManageCategory';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import ManageItems from './Pages/ManageItems/ManageItems';
import Explore from './Pages/Explore/Explore';

function App() {
  return (
    <div>
    <MenuBar/>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/category' element={<ManageCategory/>}/>
      <Route path='/users' element={<ManageUsers/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path='/items' element={<ManageItems/>}/>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
    </div>
  )
}

export default App
