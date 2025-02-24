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
import HomePage from "./TemplatePage";
// import HomePage from "./components/LocationPage";
// import PlantsPage from "./PlantsPage";
import LocationsPage from "./LocationsPage";
import TestUserForm from "./TestTableRowUserform";


const menuItems = [
  { name: "Home", path: "/home", component: HomePage },
  { name: "Locations", path: "/locations", component: LocationsPage },
  { name: "TestTableRowUserForm", path: "/userform", component: TestUserForm },
  // { name: "Plants", path: "/plants", component: PlantsPage },
  // { name: "Batches", path: "/batches", component: BatchesPage },
  // { name: "Orders", path: "/orders", component: OrdersPage },
  // { name: "Suppliers", path: "/suppliers", component: SuppliersPage },
  // { name: "Visit Records", path: "/visits", component: VisitsPage },
];
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Dynamically Generate Routes */}
        {menuItems.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
