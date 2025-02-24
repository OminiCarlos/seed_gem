/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react"; // Import icons from ShadCN UI

const DataTable = ({ data, columns, title, onAddRow }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Sorting function
  const handleSort = (key) => {
    let newOrder = "asc";
    if (sortedColumn === key && sortOrder === "asc") {
      newOrder = "desc";
    }
    setSortedColumn(key);
    setSortOrder(newOrder);
  };

  // Apply sorting, triggered at each re-rendering. When the column header is clicked, or when new data was passed in.
  const sortedData = [...data].sort((a, b) => {
    // [...data] creates a shallow copy
    if (!sortedColumn) return 0; // No sorting initially
    if (a[sortedColumn] < b[sortedColumn]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortedColumn] > b[sortedColumn]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onAddRow} // Calls the function when clicked
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          +
        </button>
      </div>
      <div className="overflow-y-auto">
        <table className="min-w-full bg-gray-50 rounded-lg">
          <thead className="bg-gray-300 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                >
                  <div className="flex items-center space-x-1">
                    <span>{col.label}</span>
                    {sortedColumn === col.key &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-2 text-sm text-gray-900">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
