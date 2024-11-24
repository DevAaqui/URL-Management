import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import UploadPDF from './pages/uploadPDF'

function App() {

  return (
    <div className='App'>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/upload-pdf" element={<UploadPDF />} />
      </Routes>
    </div>
  )
}

export default App
