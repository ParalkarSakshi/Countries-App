import React from 'react'
import Header from './Components/Header'
import './App.css'
import { ThemeProvider } from './context/ThemeContex'
import { Outlet } from 'react-router-dom'

const App = () => {

  return (
    <>
        <ThemeProvider>
          <Header />
          <Outlet />
        </ThemeProvider>
    </>
  )
}

export default App
