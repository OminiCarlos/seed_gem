import React,{ useState } from "react";
import TableRowUserForm from "./components/TableRowUserForm"; // Adjust path if needed

const TestUserForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Define columns (mock structure for the form)
  const columns = [
    { key: "field_name", label: "Field Name" },
    { key: "zone_id", label: "Zone ID" },
    { key: "is_outdoor", label: "Is Outdoor" },
  ];

  const handleSubmit = (formData) => {
    setSubmittedData(formData); // Store the submitted data for testing
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Test User Form</h1>

      {/* Open Modal Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Open User Form
      </button>

      {/* Show Modal */}
      {showModal && (
        <TableRowUserForm
          columns={columns}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Show Submitted Data */}
      {submittedData && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-lg font-semibold">Submitted Data</h2>
          <pre className="text-sm text-gray-600">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestUserForm;
