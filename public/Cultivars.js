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
    .catch(() => {
      statusElem.textContent = "Connection timed out";
    });
}

// Fetches data from the Cultivar table and displays it.
async function fetchAndDisplayCultivars() {
  const tableBody = document.querySelector("#cultivarTable tbody");

  const response = await fetch("/cultivars/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const cultivarContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  cultivarContent.forEach((cultivar) => {
    const row = tableBody.insertRow();

    [
      "plant_ID",
      "yield_type",
      "common_name",
      "scientific_name",
      "overview_notes",
      "cultivar_name",
    ].forEach((field, index) => {
      const cell = row.insertCell();
      cell.textContent = cultivar[index] || "N/A"; // Default to "N/A" if field is null/undefined
    });
  });
}

// This function resets or initializes the Cultivar table.
async function resetCultivarTable() {
  const response = await fetch("/cultivars/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Cultivar table initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new records into the Cultivar table.
async function insertCultivarTable(event) {
  event.preventDefault();

  const cultivarData = {
    plant_ID: document.getElementById("insertPlantId").value,
    cultivar_name: document.getElementById("insertCultivarName").value,
  };

  const response = await fetch("/cultivars/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cultivarData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates cultivar details in the Cultivar table.
async function updateCultivarTable(event) {
  event.preventDefault();

  const cultivarData = {
    plant_ID: document.getElementById("updatePlantId").value,
    cultivar_name: document.getElementById("updateCultivarName").value,
  };

  const response = await fetch("/cultivars/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cultivarData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Cultivar updated successfully!"
    : "Error updating cultivar!";
  fetchTableData();
}

// Deletes a cultivar from the Cultivar table by Plant ID.
async function deleteCultivarTable(event) {
  event.preventDefault();

  const plantId = document.getElementById("deletePlantId").value;

  const response = await fetch(`/cultivars/delete-demotable/${plantId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Cultivar deleted successfully!"
    : "Error deleting cultivar!";
  fetchTableData();
}

// Counts rows in the Cultivar table.
// async function countCultivarTable() {
//   const response = await fetch("/cultivars/count", {
//     method: "GET",
//   });

//   const responseData = await response.json();
//   const messageElement = document.getElementById("countResultMsg");
//   messageElement.textContent = responseData.success
//     ? `The number of tuples in the Cultivar table: ${responseData.count}`
//     : "Error in counting cultivars!";
// }

// Initializes the webpage functionalities.
window.onload = function () {
  checkDbConnection();
  fetchTableData();
  document
    .getElementById("resetCultivarTable")
    .addEventListener("click", resetCultivarTable);
  document
    .getElementById("insertCultivarTable")
    .addEventListener("submit", insertCultivarTable);
  document
    .getElementById("updateCultivarTable")
    .addEventListener("submit", updateCultivarTable);
  document
    .getElementById("deleteCultivarTable")
    .addEventListener("submit", deleteCultivarTable);
  document
    .getElementById("countCultivarTable")
    .addEventListener("click", countCultivarTable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayCultivars();
}
