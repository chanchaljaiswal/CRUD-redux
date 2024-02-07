import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import UserPage from './Pages/UserPage';
import RolePage from './Pages/RolePage';
import './App.css'

function App() {
  return (
    <div className='App' >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/edit-roles" element={<RolePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
