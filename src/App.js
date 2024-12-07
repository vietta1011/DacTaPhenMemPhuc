import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import TacGiaPage from "./pages/TacGiaPage";
import SachPage from "./pages/SachPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route path="tac-gia" element={<TacGiaPage />} />
          <Route path="sach" element={<SachPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
