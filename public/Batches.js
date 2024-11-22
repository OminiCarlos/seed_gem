// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
  const statusElem = document.getElementById("dbStatus");
  const loadingGifElem = document.getElementById("loadingGif");

  const response = await fetch("/check-db-connection", { method: "GET" });

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

// Fetches data from the demotable and displays it.
async function fetchAndDisplayUsers() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/batches/demotable", { method: "GET" });
  const responseData = await response.json();
  const demotableContent = responseData.data;

  tableBody.innerHTML = ""; // Clear existing table rows

  demotableContent.forEach((batch) => {
    const row = tableBody.insertRow();
    [
      "batch_id",
      "care_notes",
      "plant_date",
      "yield_weight",
      "planted_quantity",
      "survived_quantity",
      "item_id",
      "order_id",
      "field_name",
      "zone_id",
    ].forEach((field,index) => {
      const cell = row.insertCell();
      cell.textContent = batch[index];
    });
  });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/batches/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  document.getElementById("resetResultMsg").textContent = responseData.success
    ? "demotable initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
  event.preventDefault();

  const batchData = {
    batch_id: document.getElementById("insertBatchId").value,
    care_notes: document.getElementById("insertCareNotes").value,
    plant_date: document.getElementById("insertPlantDate").value,
    yield_weight: document.getElementById("insertYieldWeight").value,
    planted_quantity: document.getElementById("insertPlantedQuantity").value,
    survived_quantity: document.getElementById("insertSurvivedQuantity").value,
    item_id: document.getElementById("insertItemId").value,
    order_id: document.getElementById("insertOrderId").value,
    field_name: document.getElementById("insertFieldName").value,
    zone_id: document.getElementById("insertZoneId").value,
  };

  const response = await fetch("/batches/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates batch details in the demotable.
async function updateBatchDemotable(event) {
  event.preventDefault();

  const batchData = {
    batch_id: document.getElementById("updateBatchId").value,
    care_notes: document.getElementById("updateCareNotes").value,
    plant_date: document.getElementById("updatePlantDate").value,
    yield_weight: document.getElementById("updateYieldWeight").value,
    planted_quantity: document.getElementById("updatePlantedQuantity").value,
    survived_quantity: document.getElementById("updateSurvivedQuantity").value,
    item_id: document.getElementById("updateItemId").value,
    order_id: document.getElementById("updateOrderId").value,
    field_name: document.getElementById("updateFieldName").value,
    zone_id: document.getElementById("updateZoneId").value,
  };

  const response = await fetch("/batches/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "deleted successfully!"
    : "Error deleting!";
  fetchTableData();
}

// Deletes a batch from the demotable by Batch ID.
async function deleteBatchDemotable(event) {
  event.preventDefault();

  const batchId = document.getElementById("deleteBatchId").value;

  const response = await fetch(`/batches/delete-demotable/${batchId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "deleted successfully!"
    : "Error deleting!";
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
    .getElementById("updateBatchDemotable")
    .addEventListener("submit", updateBatchDemotable);
  document
    .getElementById("deleteBatchDemotable")
    .addEventListener("submit", deleteBatchDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayUsers();
}
