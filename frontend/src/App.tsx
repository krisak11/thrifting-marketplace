/*
  File: src/App.tsx
  Description: Main app router and structure
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import OnSale from "./pages/OnSale";
import NewItems from "./pages/NewItems";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/on-sale" element={<OnSale />} />
        <Route path="/new-items" element={<NewItems />} />
      </Routes>
    </Router>
  );
}

export default App;
