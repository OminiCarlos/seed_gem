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
async function fetchAndDisplayPlants() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/plants/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;
  console.log("demotableContent", demotableContent);

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((plant) => {
    const row = tableBody.insertRow();

    // Adjust to the number of columns in the 'Plant' table
    [
      "plant_id",
      "yield_type",
      "common_name",
      "scientific_name",
      "overview_notes",
    ].forEach((field, index) => {
      const cell = row.insertCell();
      cell.textContent = plant[index];
    });
  });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/plants/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "plant table initiated successfully!"
    : "Error initiating plant table!";
  fetchTableData();
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
  event.preventDefault();

  const plantData = {
    plant_id: document.getElementById("insertPlantId").value,
    yield_type: document.getElementById("insertYieldType").value,
    common_name: document.getElementById("insertCommonName").value,
    scientific_name: document.getElementById("insertScientificName").value,
    overview_notes: document.getElementById("insertOverviewNotes").value,
  };

  const response = await fetch("/plants/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plantData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates plant details in the demotable.
async function updatePlantDemotable(event) {
  event.preventDefault();

  const plantData = {
    plant_id: document.getElementById("updatePlantId").value,
    yield_type: document.getElementById("updateYieldType").value,
    common_name: document.getElementById("updateCommonName").value,
    scientific_name: document.getElementById("updateScientificName").value,
    overview_notes: document.getElementById("updateOverviewNotes").value,
  };

  const response = await fetch("/plants/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plantData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Plant updated successfully!"
    : "Error updating plant!";
  fetchTableData();
}

// Deletes a plant from the demotable by Plant ID.
async function deletePlantDemotable(event) {
  event.preventDefault();

  const plantId = document.getElementById("deletePlantId").value;

  const response = await fetch(`/plants/delete-demotable/${plantId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Plant deleted successfully!"
    : "Error deleting plant!";
  fetchTableData();
}

// Counts rows in the demotable.
async function countDemotable() {
  const response = await fetch("/plants/count-demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("countResultMsg");
  messageElement.textContent = responseData.success
    ? `The number of tuples in Plants: ${responseData.count}`
    : "Error in count Plants!";
}

// Count plants yielding fruits
async function countFruitYieldingPlants() {
  const response = await fetch("/plants/count-fruit-yielding-plants", {
    method: "GET",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("fruitYieldCountResultMsg");
  messageElement.textContent = responseData.success
    ? `Number of fruit-yielding plants: ${responseData.count}`
    : "Error counting fruit-yielding plants!";
}

async function fetchYieldTypeCounts() {
  try {
    // Make an API call to fetch the count of plants by yield type
    const response = await fetch("/plants/yield-type-count", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch yield type counts");
    }

    const responseData = await response.json();

    // Get the table body for the yield type count table
    const tableBody = document.querySelector("#yieldTypeCountTable tbody");

    // Clear existing rows in the table
    tableBody.innerHTML = "";

    // Populate the table with the fetched data
    responseData.data.forEach((entry) => {
      const row = tableBody.insertRow();
      const yieldTypeCell = row.insertCell();
      const countCell = row.insertCell();

      yieldTypeCell.textContent = entry.yield_type;
      countCell.textContent = entry.count;
    });
  } catch (error) {
    console.error("Error fetching yield type counts:", error);
    document.getElementById("yieldTypeCountResultMsg").textContent =
      "Error fetching yield type counts.";
  }
}

// Fetch and display the count of plants with "care" in overview_notes, grouped by yield_type
async function fetchCareCount() {
  try {
    // Make an API call to fetch the count
    const response = await fetch("/plants/care-count", { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to fetch care count data");
    }

    const responseData = await response.json();

    // Get the table body for the care count table
    const tableBody = document.querySelector("#careCountTable tbody");

    // Clear existing rows in the table
    tableBody.innerHTML = "";

    // Populate the table with the fetched data
    responseData.data.forEach((entry) => {
      const row = tableBody.insertRow();
      const yieldTypeCell = row.insertCell();
      const countCell = row.insertCell();

      yieldTypeCell.textContent = entry.yield_type;
      countCell.textContent = entry.count;
    });

    // Clear any error messages
    document.getElementById("careCountResultMsg").textContent = "";
  } catch (error) {
    console.error("Error fetching care count data:", error);
    document.getElementById("careCountResultMsg").textContent =
      "Error fetching care count data.";
  }
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
    .getElementById("updatePlantDemotable")
    .addEventListener("submit", updatePlantDemotable);
  document
    .getElementById("deletePlantDemotable")
    .addEventListener("submit", deletePlantDemotable);
  document
    .getElementById("countDemotable")
    .addEventListener("click", countDemotable);
  document
    .getElementById("countPlantsYieldingFruits")
    .addEventListener("click", countFruitYieldingPlants);
    document
  .getElementById("fetchYieldTypeCount")
  .addEventListener("click", fetchYieldTypeCounts);
  document
  .getElementById("fetchCareCount")
  .addEventListener("click", fetchCareCount);


};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayPlants();
}


