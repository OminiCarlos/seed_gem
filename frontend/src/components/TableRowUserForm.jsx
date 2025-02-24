import React, { useState } from "react";

const TableRowUserForm = ({ columns, onClose, onSubmit }) => {
  // acc is accumulator, reduce comsumes column and creates a single object with field name and value = "".
  // originaly the stat of the form is empty string in each field. 
  const [formData, setFormData] = useState(() =>
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
  );

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData); // Send data to parent component
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>

        {/* Input fields */}
        {columns.map((col) => (
          <div key={col.key} className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              {col.label}
            </label>
            <input
              type="text"
              value={formData[col.key]}
              onChange={(e) => handleChange(col.key, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
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
