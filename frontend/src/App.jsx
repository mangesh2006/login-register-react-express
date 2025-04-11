import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Verify from './Components/Verify.jsx'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <header>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </header>
      <ToastContainer position='top-center' autoClose={3000} />
    </>
  )
}

export default App
