import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/home" },
  { name: "Plants", path: "/plants" },
  { name: "Batches", path: "/batches" },
  { name: "Locations", path: "/locations" },
  { name: "Orders", path: "/orders" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "Visit Records", path: "/visits" },
];

const Sidebar = () => {
  return (
    <aside className="w-1/5 p-6 h-screen">
      <div className="p-6 bg-gray-200 h-full">
      <nav>
        <ul className="space-y-4">
          {menuItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "font-bold text-3xl" : "")}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </aside>
  );
};

export default Sidebar;
