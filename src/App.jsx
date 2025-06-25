import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './presentation/DashboardPage';

const App = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
  </Routes>
);

export default App;