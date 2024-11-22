// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
  const statusElem = document.getElementById("dbStatus");
  const loadingGifElem = document.getElementById("loadingGif");

  const response = await fetch("/check-db-connection", {
    method: "GET",
  });

  loadingGifElem.style.display = "none";
  statusElem.style.display = "inline";

  response
    .text()
    .then((text) => {
      statusElem.textContent = text;
    })
    .catch((error) => {
      statusElem.textContent = "connection timed out";
    });
}

// Fetches data from the supplier table and displays it.
async function fetchAndDisplaySuppliers() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/suppliers/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((supplier) => {
    const row = tableBody.insertRow();

    [
      "supplier_id",
      "supplier_name",
      "supplier_address",
      "supplier_tel",
    ].forEach((field) => {
      const cell = row.insertCell();
      cell.textContent = supplier[field];
    });
  });
}

// This function resets or initializes the supplier table.
async function resetDemotable() {
  const response = await fetch("/suppliers/initiate-demotable", {
    method: "POST",
  });

  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Demotable initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new supplier records into the supplier table.
async function insertDemotable(event) {
  event.preventDefault();

  const supplierData = {
    supplier_id: document.getElementById("insertSupplierId").value,
    supplier_name: document.getElementById("insertSupplierName").value,
    supplier_address: document.getElementById("insertSupplierAddress").value,
    supplier_tel: document.getElementById("insertSupplierTel").value,
  };

  const response = await fetch("/suppliers/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplierData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates supplier details in the supplier table.
async function updateSupplierDemotable(event) {
  event.preventDefault();

  const supplierData = {
    supplier_id: document.getElementById("updateSupplierId").value,
    supplier_name: document.getElementById("updateSupplierName").value,
    supplier_address: document.getElementById("updateSupplierAddress").value,
    supplier_tel: document.getElementById("updateSupplierTel").value,
  };

  const response = await fetch("/suppliers/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplierData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Supplier updated successfully!"
    : "Error updating supplier!";
  fetchTableData();
}

// Deletes a supplier from the supplier table by Supplier ID.
async function deleteSupplierDemotable(event) {
  event.preventDefault();

  const supplierId = document.getElementById("deleteSupplierId").value;

  const response = await fetch(`/suppliers/delete-demotable/${supplierId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Supplier deleted successfully!"
    : "Error deleting supplier!";
  fetchTableData();
}

// Initializes the webpage functionalities.
window.onload = function () {
  checkDbConnection();
  fetchTableData();
  document
    .getElementById("resetDemotable")
    .addEventListener("click", resetDemotable);
  document
    .getElementById("insertDemotable")
    .addEventListener("submit", insertDemotable);
  document
    .getElementById("updateSupplierDemotable")
    .addEventListener("submit", updateSupplierDemotable);
  document
    .getElementById("deleteSupplierDemotable")
    .addEventListener("submit", deleteSupplierDemotable);
  document
    .getElementById("countDemotable")
    .addEventListener("click", countDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplaySuppliers();
}
