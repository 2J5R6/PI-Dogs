import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import FormPage from './views/FormPage/FormPage';
import Favorites from './views/Favorites/Favorites';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/pokemon/:id" element={<DetailPage />} /> 
        <Route path="/create" element={<FormPage />}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<NavBar />} /> */}
        <Route path="/" element={<LandingPage />} />
      </Routes>

    </div>
  );
}

export default App;
