import './App.css'
import {Routes, Route} from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
import Dashboard from './user/Dashboard'
function App() {
  return (
    <>
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </>
    )
  }

export default App
