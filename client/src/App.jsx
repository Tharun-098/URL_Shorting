import React from 'react'
import './App.css'
import MainPage from './layouts/MainPage'
import Stats from './components/Stats'
import {Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/stats/:code' element={<Stats/>} />
      </Routes>
    </div>
  )
}

export default App
