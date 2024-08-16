import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrowseRatingsPage from './pages/BrowseRatingsPage';
import RateGrinderPage from './pages/RateGrinderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowseRatingsPage />} />
        <Route path="/rate" element={<RateGrinderPage />} />
      </Routes>
    </Router>
  );
}

export default App;