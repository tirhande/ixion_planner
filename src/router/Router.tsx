import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, To } from 'react-router-dom';
import SectorPage from 'pages/Sector';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SectorPage />} />
        <Route path="/*" element={<Redirect to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const Redirect = ({ to }: { to: To }) => <Navigate to={to} />;

export default Router;
