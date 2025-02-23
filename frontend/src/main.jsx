import "./index.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import ReactDOM from "react-dom/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import LoginPage from "./LoginPage";
import HomePage from "./SidebarTest";
// import HomePage from "./components/LocationPage";
// import PlantsPage from "./PlantsPage";
// import LocationsPage from "./LocationsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/plants" element={<PlantsPage />} />
        <Route path="/locations" element={<LocationsPage />} /> */}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
