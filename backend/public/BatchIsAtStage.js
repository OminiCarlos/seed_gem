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

// Fetches data from the batch_is_at_stage table and displays it.
async function fetchAndDisplayBatchStages() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/batchIsAtStage/demotable", { method: "GET" });
  const responseData = await response.json();
  const demotableContent = responseData.data;

  tableBody.innerHTML = ""; // Clear existing table rows

  demotableContent.forEach((isAt) => {
    const row = tableBody.insertRow();
    ["batch_ID", "plant_ID", "stage_name", "start_date", "end_date"].forEach(
      (field, index) => {
        const cell = row.insertCell();
        if (field === "start_date" || field === "end_date") {
          // Format the date fields
          const date = new Date(isAt[index]);
          cell.textContent = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
        } else {
          cell.textContent = isAt[index];
        }
      }
    );
  });
}

// This function resets or initializes the batch_is_at_stage table.
async function resetBatchStages() {
  const response = await fetch("/batchIsAtStage/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  document.getElementById("resetResultMsg").textContent = responseData.success
    ? "Batch stages table initialized successfully!"
    : "Error initializing table!";
  fetchTableData();
}

// Inserts new records into the batch_is_at_stage table.
async function insertBatchStage(event) {
  event.preventDefault();

  const stageData = {
    batch_ID: document.getElementById("insertBatchId").value,
    plant_ID: document.getElementById("insertPlantId").value,
    stage_name: document.getElementById("insertStageName").value,
    start_date: document.getElementById("insertStartDate").value,
    end_date: document.getElementById("insertEndDate").value,
  };

  const response = await fetch("/batchIsAtStage/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stageData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Stage inserted successfully!"
    : "Error inserting stage!";
  fetchTableData();
}

// Updates batch stage details in the batch_is_at_stage table.
async function updateBatchStage(event) {
  event.preventDefault();

  const stageData = {
    batch_ID: document.getElementById("updateBatchId").value,
    plant_ID: document.getElementById("updatePlantId").value,
    stage_name: document.getElementById("updateStageName").value,
    start_date: document.getElementById("updateStartDate").value,
    end_date: document.getElementById("updateEndDate").value,
  };

  const response = await fetch("/batchIsAtStage/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stageData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Stage updated successfully!"
    : "Error updating stage!";
  fetchTableData();
}

// Deletes a batch stage from the batch_is_at_stage table.
async function deleteBatchStage(event) {
  event.preventDefault();

  const batchId = document.getElementById("deleteBatchId").value;
  const plantId = document.getElementById("deletePlantId").value;
  const stageName = document.getElementById("deleteStageName").value;

  const response = await fetch(
    `/batchIsAtStage/delete-demotable/${batchId}/${plantId}/${stageName}`,
    {
      method: "DELETE",
    }
  );

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Stage deleted successfully!"
    : "Error deleting stage!";
  fetchTableData();
}

// Initializes the webpage functionalities.
window.onload = function () {
  checkDbConnection();
  fetchTableData();
  document
    .getElementById("resetDemotable")
    .addEventListener("click", resetBatchStages);
  document
    .getElementById("insertDemotable")
    .addEventListener("submit", insertBatchStage);
  document
    .getElementById("updateBatchStageDemotable")
    .addEventListener("submit", updateBatchStage);
  document
    .getElementById("deleteBatchStageDemotable")
    .addEventListener("submit", deleteBatchStage);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayBatchStages();
}
