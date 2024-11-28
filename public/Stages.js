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

// Fetches data from the demotable and displays it.
async function fetchAndDisplayStages() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/stages/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;
  console.log(demotableContent);

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((stage) => {
    const row = tableBody.insertRow();

    // Adjust to the number of columns in the 'stage' table
    [
      "plant_id",
      "common_name",
      "stage_name",
    ].forEach((field, index) => {
      const cell = row.insertCell();
      cell.textContent = stage[index];
    });
  });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/stages/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "stage table initiated successfully!"
    : "Error initiating stagetable!";
  fetchTableData();
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
  event.preventDefault();

  const stageData = {
    plant_id: document.getElementById("insertPlantId").value,
    stage_name: document.getElementById("insertStageName").value,
  };

  const response = await fetch("/stages/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stageData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates stage details in the demotable.
async function updateDemotable(event) {
  event.preventDefault();

  const stageData = {
    plant_id: document.getElementById("insertPlantId").value,
    scientific_name: document.getElementById("insertStageName").value,
  };

  const response = await fetch("/stages/update-demotable", {
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

// Deletes a stage from the demotable by Plant ID + Stage name.
async function deleteDemotable(event) {
  event.preventDefault();

  const stageData = {
    plant_id: document.getElementById("deletePlantId").value,
    stage_name: document.getElementById("deleteStageName").value,
  };

  console.log(stageData);

  const response = await fetch("/stages/delete-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stageData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Stage deleted successfully!"
    : "Error deleting Stage!";
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
    .getElementById("updateDemotable")
    .addEventListener("submit", updateDemotable);
  document
    .getElementById("deleteDemotable")
    .addEventListener("submit", deleteDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayStages();
}
