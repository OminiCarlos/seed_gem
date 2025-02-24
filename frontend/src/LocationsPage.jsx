/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import supabase from "../util/supabase";
import DataTable from "./components/DataTable";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import TableRowUserForm from "./components/TableRowUserForm"; // Import the user form

const TopBarParam = {
  pageTitle: "Locations",
  onSearch: (query) => console.log("Searching for:", query),
  onAddBatch: () => console.log("Add batch clicked!"),
};

// @todo: get the supabase client working 

const LocationDisplay = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

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
    {
      key: "field_name",
      label: "Field Name",
      isDropdown: true,
      fetchUrl: "http://localhost:50000/locations/list-field-name",
    },
    { key: "zone_id", label: "Zone ID" },
    {
      key: "is_outdoor",
      label: "Is Outdoor",
       isDropdown: true,
      options: [
        { value: 1, label: "Outdoor" },
        { value: 0, label: "Indoor" },
      ],
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

  // Instead of directly adding a blank row, open the form modal
  const addNewRow = () => {
    setShowUserForm(true);
  };

  // Handle form submission from the user form
  const handleUserFormSubmit = (formData) => {
    // Optionally add a unique id or process the form data before adding to locations.
    const newLocation = {...formData };
    console.log(newLocation);
    setLocations((prev) => [newLocation, ...prev]);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar with fixed width */}
        <Sidebar className="w-64" />

        {/* Right section: flex column layout */}
        <div className="flex-1 flex flex-col">
          {/* Top section (1/3 of the height) */}
          <div className="h-1/8 flex flex-col">
            <TopBar
              pageTitle={TopBarParam.pageTitle}
              onSearch={TopBarParam.onSearch}
              onAddBatch={TopBarParam.onAddBatch}
            />
          </div>

          <div className="h-3/8 bg-gray-100 p-4 border-b">
            <h2 className="text-lg font-semibold">Add Map</h2>
          </div>

          {/* Bottom section (2/3 of the height) */}
          <div className="h-1/2 flex flex-col overflow-hidden">
            <DataTable
              data={locations}
              columns={columns}
              title="Locations Overview"
              onAddRow={addNewRow}
            />
          </div>
        </div>
      </div>

      {/* Render the TableRowUserForm as a modal when showUserForm is true */}
      {showUserForm && (
        <TableRowUserForm
          columns={columns}
          onClose={() => setShowUserForm(false)}
          onSubmit={(formData) => {
            handleUserFormSubmit(formData);
            setShowUserForm(false);
          }}
        />
      )}
    </>
  );
};

export default LocationDisplay;
