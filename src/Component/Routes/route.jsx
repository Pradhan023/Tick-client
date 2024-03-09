import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import Home from '../Home'
import Ticktask from '../Ticktask/Ticktask'

const AllRoute = () => {
  return (
    <div className="min-h-[80vh]">
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/ticklist' element={<Ticktask/>} />
        </Routes>
    </div>
  )
}

export default AllRoute