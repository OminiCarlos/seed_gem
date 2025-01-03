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

  const response = await fetch("/locations/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;
  console.log(demotableContent)

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((location) => {
    const row = tableBody.insertRow();

    ["field_name", "zone_id", "is_outdoor", "is_irrigated"].forEach((field,index) => {
      const cell = row.insertCell();
      cell.textContent = location[index];
    });
  });
}
//
// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/locations/initiate-demotable", {
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
    // is_irrigated: document.getElementById("insertIsIrrigated").checked,
  };

  const response = await fetch("/locations/insert-demotable", {
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
    // is_irrigated: document.getElementById("updateIsIrrigated").checked,
  };

  const response = await fetch("/locations/update-demotable", {
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
    `/locations/delete-demotable/${fieldName}/${zoneId}`,
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

async function applyLocationFilter() {
  // Get checkbox states
  const showOutdoor = document.getElementById("showOutdoor").checked?1:0;
  const showIndoor = document.getElementById("showIndoor").checked?1:0;

  try {
    // Make an API call to fetch filtered data
    const response = await fetch(
      `/locations/filter-demotable?showOutdoor=${showOutdoor}&showIndoor=${showIndoor}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filtered data");
    }

    const data = await response.json();
    console.log(data);

    // Get the table body
    const tableBody = document.querySelector("#demotable tbody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Populate the table with the filtered data
    data.data.forEach((location) => {
      const row = tableBody.insertRow();
      ["field_name", "zone_id", "is_outdoor", "__"].forEach((field, index) => {
        const cell = row.insertCell();
        cell.textContent = location[index];
      });
    });
  } catch (error) {
    console.error("Error applying location filter:", error);
  }
}


// // Counts rows in the demotable.
// async function countDemotable() {
//   const response = await fetch("/locations-count-demotable", {
//     method: "GET",
//   });

//   const responseData = await response.json();
//   const messageElement = document.getElementById("countResultMsg");
//   messageElement.textContent = responseData.success
//     ? `The number of tuples in demotable: ${responseData.count}`
//     : "Error in count demotable!";
// }

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
  document
    .getElementById("applyFilter")
    .addEventListener("click", applyLocationFilter);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayLocations();
}
