/* eslint-disable no-unused-vars */
import React from "react";
import DataTable from "./components/DataTable";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";

const TopBarParam = {
  pageTitle: "Test",
  onSearch: (query) => console.log("Searching for:", query),
  onAddBatch: () => console.log("Add batch clicked!"),
};

const isThreeSections = true;

const rightFlexContent = () => {
  if (isThreeSections) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="h-1/8 flex flex-col border-b">
          <TopBar
            pageTitle={TopBarParam.pageTitle}
            onSearch={TopBarParam.onSearch}
            onAddBatch={TopBarParam.onAddBatch}
          />
          {/* Add your top section content here */}
        </div>

        <div className="h-3/8 bg-gray-100 flex flex-col border-b">
          <h2 className="text-lg font-semibold">Middle Section</h2>
          {/* Add your top section content here */}
        </div>

        {/* Bottom section (2/3 of the height) */}
        <div className="h-1/2 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold">Bottom Section</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex-1 flex flex-col">
        <div className="h-1/8 flex flex-col border-b">
          <TopBar
            pageTitle={TopBarParam.pageTitle}
            onSearch={TopBarParam.onSearch}
            onAddBatch={TopBarParam.onAddBatch}
          />
          {/* Add your top section content here */}
        </div>

        {/* Bottom section (2/3 of the height) */}
        <div className="h-7/8 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold">Bottom Section</h2>
        </div>
      </div>
    );
  }
};

const TestPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed width */}
      <Sidebar className="w-64" />
      {/* Right section: flex column layout */}
      {rightFlexContent()}
    </div>
  );
};

export default TestPage;
