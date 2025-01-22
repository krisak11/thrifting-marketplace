/*
  File: src/App.tsx
  Description: Main app router and structure
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />

      </Routes>
    </Router>
  );
}

export default App;
