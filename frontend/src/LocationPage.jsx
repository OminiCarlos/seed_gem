
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import supabase from "../util/supabase";
import DataTable from "./components/DataTable";
import Sidebar from "./components/SideBar";

console.log("in loc", supabase);


// @todo: get the supabase client working 

const LocationDisplay = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      console.log("Fetching data...");
      const res = await fetch("http://localhost:50000/locations/demotable");
      const jsonData = await res.json();

      console.log("jsonData is: ", jsonData); // Confirm the fetched data
      setLocations(jsonData.data || []); // Ensure locations is always an array
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-lg text-gray-600">Loading locations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        Error loading locations: {error}
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        No locations found in the database
      </div>
    );
  }

  const columns = [
    { key: "field_name", label: "Field Name" },
    { key: "zone_id", label: "Zone ID" },
    {
      key: "is_outdoor",
      label: "Is Outdoor",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === 1
              ? "bg-green-100 text-green-800"
              : value === 0
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value === 1 ? "Outdoor" : value === 0 ? "Indoor" : "Unknown"}
        </span>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <Sidebar className="w-64" />

      {/* Right section: flex column layout */}
      <div className="flex-1 flex flex-col">
        {/* Top section (1/3 of the height) */}
        <div className="h-1/8 bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold">Top Section</h2>
          {/* Add your top section content here */}
        </div>

        <div className="h-3/8 bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold">Middle Section</h2>
          {/* Add your top section content here */}
        </div>

        {/* Bottom section (2/3 of the height) */}
        <div className="h-1/2 flex flex-col overflow-hidden">
          <DataTable data={locations} columns={columns} title="Locations" />
        </div>
      </div>
    </div>
  );

};

export default LocationDisplay;
