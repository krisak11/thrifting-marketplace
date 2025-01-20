import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <h1>
            Welcome to the thrifting website.
          </h1>
        }
      />
    </Routes>
  </Router>
);

export default App;
