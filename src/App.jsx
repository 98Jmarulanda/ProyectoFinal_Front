import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { LoginRegister } from "./components/LoginRegister/LoginRegister";
import  IndexAdm  from "./components/Index/IndexAdm"
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/IndexAdm" element={<IndexAdm />} />
    </Routes>
  );
}

export default App
