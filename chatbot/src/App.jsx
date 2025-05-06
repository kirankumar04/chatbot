import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/Facultydashboard";


function App() {
  return (
    // <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/faculty/:id" element={<FacultyDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;
