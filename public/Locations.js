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
async function fetchAndDisplayLocations() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/location-demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";
  console.log(demotableContent);

  // Populate the table with data
  demotableContent.forEach((location) => {
    const row = tableBody.insertRow();

    // ["field_name", "zone_id", "is_outdoor", "is_irrigated"].forEach((field, index) => {
    //   // console.log(location[index]);
    //   const cell = row.insertCell();
    //   cell.textContent = location[index]?location[index]:(location[index-1]?0:1);
    // });

    ["field_name", "zone_id", "is_outdoor"].forEach((field, index) => {
      // console.log(location[index]);
      const cell = row.insertCell();
      cell.textContent = location[index];
    });
  });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/location-initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Demotable initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
  event.preventDefault();

  const locationData = {
    field_name: document.getElementById("insertFieldName").value,
    zone_id: document.getElementById("insertZoneId").value,
    is_outdoor: document.getElementById("insertIsOutdoor").checked,
    is_irrigated: document.getElementById("insertIsIrrigated").checked,
  };

  const response = await fetch("/location-insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(locationData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates location details in the demotable.
async function updateLocationDemotable(event) {
  event.preventDefault();

  const locationData = {
    field_name: document.getElementById("updateFieldName").value,
    zone_id: document.getElementById("updateZoneId").value,
    is_outdoor: document.getElementById("updateIsOutdoor").checked,
    is_irrigated: document.getElementById("updateIsIrrigated").checked,
  };

  const response = await fetch("/location-update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(locationData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Location updated successfully!"
    : "Error updating location!";
  fetchTableData();
}

// Deletes a location from the demotable by Field Name and Zone ID.
async function deleteLocationDemotable(event) {
  event.preventDefault();

  const fieldName = document.getElementById("deleteFieldName").value;
  const zoneId = document.getElementById("deleteZoneId").value;

  const response = await fetch(
    `/location-delete-demotable/${fieldName}/${zoneId}`,
    {
      method: "DELETE",
    }
  );

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Location deleted successfully!"
    : "Error deleting location!";
  fetchTableData();
}

// Counts rows in the demotable.
async function countDemotable() {
  const response = await fetch("/location-count-demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("countResultMsg");
  messageElement.textContent = responseData.success
    ? `The number of tuples in demotable: ${responseData.count}`
    : "Error in count demotable!";
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
    .getElementById("updateLocationDemotable")
    .addEventListener("submit", updateLocationDemotable);
  document
    .getElementById("deleteLocationDemotable")
    .addEventListener("submit", deleteLocationDemotable);
  document
    .getElementById("countDemotable")
    .addEventListener("click", countDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayLocations();
}
