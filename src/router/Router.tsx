import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, To } from 'react-router-dom';
import HomePage from 'pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Redirect to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const Redirect = ({ to }: { to: To }) => <Navigate to={to} />;

export default Router;
