import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { LoginRegister } from "./components/LoginRegister/LoginRegister";
import  {IndexAdm}  from "./components/Index/IndexAdm";
import {IndexUser} from './components/Index/IndexUser';
import { CitasAdmin } from './components/Citas/CitasAdmin';
import { UserList } from './components/UserInfo/UserList';
import { MyInfo } from './components/UserInfo/MyInfo';
import './App.css';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/IndexAdm" element={<IndexAdm />} />
      <Route path="/IndexUser" element={<IndexUser />} />
      <Route path="/CitasAdmin" element={<CitasAdmin />} /> 
      <Route path="/UserList" element={<UserList />} />
      <Route path="/MyInfo" element={<MyInfo />} />
    </Routes>
  );
}

export default App
