import React, { useState } from "react";

const TableRowUserForm = ({ columns, onClose, onSubmit }) => {
  // Initialize formData where each key starts as an empty string
  const [formData, setFormData] = useState(() =>
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
  );

  // Store fetched dropdown options by column key
  const [fetchedOptions, setFetchedOptions] = useState({});

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // When a field that should be a dropdown gains focus, fetch its options from the backend.
  const handleFocus = async (col) => {
    // Only fetch if the column doesn't have static options and hasn't fetched yet.
    if (
      col.isDropdown &&
      !col.options &&
      !fetchedOptions[col.key] &&
      col.fetchUrl
    ) {
      try {
        const response = await fetch(col.fetchUrl);
        const data = await response.json();
        console.log("dropdown data: ", data);
        // Assume data is an array of options. Each option can have "value" and "label"
        setFetchedOptions((prev) => ({
          ...prev,
          [col.key]: data,
        }));
      } catch (error) {
        console.error("Error fetching options for", col.key, error);
      }
    }
  };

  const handleSubmit = () => {
    const processedData = { ...formData };
    if (processedData.is_outdoor !== "") {
      processedData.is_outdoor = Number(processedData.is_outdoor);
    }
    onSubmit(processedData); // Send data to parent component
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>

        {/* Input fields */}
        {columns.map((col) => (
          <div key={col.key} className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              {col.label}
            </label>
            {col.isDropdown ? (
              // Use static options from the column definition if provided,
              // otherwise check if fetched options exist.
              <select
                value={formData[col.key]}
                onFocus={() => handleFocus(col)}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select {col.label}</option>
                {(col.options || fetchedOptions[col.key])?.map(
                  (option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            ) : (
              // Regular text input for non-dropdown fields.
              <input
                type="text"
                value={formData[col.key]}
                onChange={(e) => handleChange(col.key, e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableRowUserForm;
