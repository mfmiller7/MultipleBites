import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BrowseRatingsPage from './pages/BrowseRatingsPage';
import RateGrinderPage from './pages/RateGrinderPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowseRatingsPage />} />
        <Route path="/rate" element={<RateGrinderPage />} />
      </Routes>
    </Router>
  );
};