import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDogs, getTemperaments } from './redux/actions/actions';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage';
import LandingPage from './views/LandingPage/LandingPage';
import FormPage from './views/FormPage/FormPage';
import NavBar from './components/NavBar/NavBar';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const showNavBar = location.pathname !== '/';

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dog/:id" element={<DetailPage />} />
        <Route path="/create" element={<FormPage />} />
      </Routes>
    </>
  );
};

export default App;
