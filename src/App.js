import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTeamPlayerPage from "./pages/AddTeamPlayerPage";
import Homepage from "./pages/HomePage"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/addteamplayer" element={<AddTeamPlayerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
