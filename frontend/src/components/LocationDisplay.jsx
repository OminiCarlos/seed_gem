import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://hcwkiyqibkgkluouhkib.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd2tpeXFpYmtna2x1b3Voa2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNDExODYsImV4cCI6MjA0MjgxNzE4Nn0.DZXk4MZ-x6myPy5XW0N6FRu06T6z53r1asvXlpdRLio"
);

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
      const data = fetch("http://localhost:50000/locations/demotable").then(
        (res) => res.json()
      );

      console.log("Received data:", data);
      setLocations(data || []);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Locations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Field Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Zone ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Is Outdoor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {locations.map((location) => (
              <tr
                key={`${location.field_name}-${location.zone_id}`}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {location.field_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {location.zone_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      location.is_outdoor === 1
                        ? "bg-green-100 text-green-800"
                        : location.is_outdoor === 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {location.is_outdoor === 1
                      ? "Outdoor"
                      : location.is_outdoor === 0
                        ? "Indoor"
                        : "Unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationDisplay;
