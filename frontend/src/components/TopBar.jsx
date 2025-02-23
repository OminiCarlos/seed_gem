import React from "react"
import { Search } from "lucide-react";

const TopBar = ({ pageTitle, onSearch,onAddBatch}) => {
  return (
    <div className="flex items-center justify-between p-8 w-full h-full">
      {/* Page Title */}
      <h2 className="text-xl font-semibold">{pageTitle}</h2>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-gray-300"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Add Batch Button */}
      <button
        className="bg-black text-white px-10 py-2 hover:bg-gray-800"
        onClick={onAddBatch}
      >
        Add a batch
      </button>
    </div>
  );
};

export default TopBar;
