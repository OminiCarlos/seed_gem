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
        statusElem.textContent = "connection timed out";
      });
  }
  
  // Fetches data from the location distinguished by soil table and displays it.
  async function fetchAndDisplayLocationSoil() {
    const tableBody = document.querySelector("#locationSoilTable tbody");
  
    const response = await fetch("/locdistinguishedbysoil/demotable", {
      method: "GET",
    });
  
    const responseData = await response.json();
    const tableContent = responseData.data;
  
    // Clear existing table rows
    tableBody.innerHTML = "";
  
    // Populate the table with data
    tableContent.forEach((entry) => {
      const row = tableBody.insertRow();
  
      ["field_name", "zone_id", "is_outdoor", "soil_type", "pH", "organic"].forEach((field,index) => {
        const cell = row.insertCell();
        cell.textContent = entry[index];
      });
    });
  }
  
  // Resets or initializes the location distinguished by soil table.
  async function resetLocationSoilTable() {
    const response = await fetch("/locdistinguishedbysoil/initiate-demotable", {
      method: "POST",
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("resetResultMsg");
  
    messageElement.textContent = responseData.success
      ? "Location distinguished by soil table reset successfully!"
      : "Error resetting table!";
    fetchTableData();
  }
  
  // Inserts new records into the location distinguished by soil table.
  async function insertLocationSoil(event) {
    event.preventDefault();
  
    const entryData = {
      field_name: document.getElementById("insertFieldName").value,
      zone_id: parseInt(document.getElementById("insertZoneId").value),
      soil_type: document.getElementById("insertSoilType").value,
    };
  
    const response = await fetch("/locdistinguishedbysoil/insert-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryData),
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("insertResultMsg");
  
    messageElement.textContent = responseData.success
      ? "Data inserted successfully!"
      : "Error inserting data!";
    fetchTableData();
  }
  
  // Updates a record in the location distinguished by soil table.
  async function updateLocationSoil(event) {
    event.preventDefault();
  
    const entryData = {
      field_name: document.getElementById("updateFieldName").value,
      zone_id: parseInt(document.getElementById("updateZoneId").value),
      old_soil_type: document.getElementById("updateOldSoilType").value,
      new_soil_type: document.getElementById("updateNewSoilType").value,
    };
  
    const response = await fetch("/locdistinguishedbysoil/update-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryData),
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("updateResultMsg");
  
    messageElement.textContent = responseData.success
      ? "Record updated successfully!"
      : "Error updating record!";
    fetchTableData();
  }
  
  // Deletes a record from the location distinguished by soil table.
  async function deleteLocationSoil(event) {
    event.preventDefault();
  
    const entryData = {
      field_name: document.getElementById("deleteFieldName").value,
      zone_id: parseInt(document.getElementById("deleteZoneId").value),
      soil_type: document.getElementById("deleteSoilType").value,
    };
  
    const response = await fetch("/locdistinguishedbysoil/delete-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryData),
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("deleteResultMsg");
  
    messageElement.textContent = responseData.success
      ? "Record deleted successfully!"
      : "Error deleting record!";
    fetchTableData();
  }

  // Handles fetching and displaying "Good Locations"
async function fetchAndDisplayGoodLocations() {
  const tableBody = document.querySelector("#goodLocationTable tbody");
  const resultMsg = document.getElementById("goodLocationResultMsg");

  // Send a request to the backend to fetch good locations
  const response = await fetch("/locdistinguishedbysoil/good-locations", {
    method: "GET",
  });

  const responseData = await response.json();

  if (responseData.success) {
    const goodLocations = responseData.data;

    // Clear existing rows in the good locations table
    tableBody.innerHTML = "";

    // Populate the table with "Good Locations" data
    goodLocations.forEach((entry) => {
      const row = tableBody.insertRow();

      ["field_name", "zone_id", "is_outdoor", "soil_type", "pH", "organic"].forEach(
        (field, index) => {
          const cell = row.insertCell();
          cell.textContent = entry[index];
        }
      );
    });

    resultMsg.textContent = "Good locations displayed successfully!";
  } else {
    resultMsg.textContent = "Error fetching good locations.";
  }
}

  
  // Counts rows in the location distinguished by soil table.
//   async function countLocationSoilTable() {
//     const response = await fetch("/locdistinguishedbysoil/count", {
//       method: "GET",
//     });
  
//     const responseData = await response.json();
//     const messageElement = document.getElementById("countResultMsg");
  
//     messageElement.textContent = responseData.success
//       ? `The number of tuples in the table: ${responseData.count}`
//       : "Error in counting table entries!";
//   }


// Handles fetching and displaying "Super Fields"
async function fetchAndDisplaySuperFields() {
  const tableBody = document.querySelector("#superFieldsTable tbody");
  const resultMsg = document.getElementById("superFieldsResultMsg");

  // Send a request to the backend to fetch super fields
  const response = await fetch("/locdistinguishedbysoil/super-fields", {
    method: "GET",
  });

  const responseData = await response.json();

  if (responseData.success) {
    const superFields = responseData.data;

    // Clear existing rows in the super fields table
    tableBody.innerHTML = "";

    console.log(superFields);

    // Populate the table with "Super Fields" data
    superFields.forEach((entry) => {
      const row = tableBody.insertRow();

      ["field_name"].forEach((field, index) => {
        const cell = row.insertCell();
        cell.textContent = entry[index];
      });
    });

    resultMsg.textContent = "Super fields displayed successfully!";
  } else {
    resultMsg.textContent = "Error fetching super fields.";
  }
}

// Fetches and displays information for a specific Field Name
async function fetchAndDisplayFieldName(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const fieldName = document.getElementById("findFieldNameInput").value.trim();
  const resultMsg = document.getElementById("findFieldNameResultMsg");
  const tableBody = document.querySelector("#findFieldNameTable tbody");

  // Clear previous results
  resultMsg.textContent = "";
  tableBody.innerHTML = "";

  if (!fieldName) {
    resultMsg.textContent = "Please enter a valid Field Name.";
    return;
  }

  try {
    // Send a request to the backend with the specified Field Name
    const response = await fetch(`/locdistinguishedbysoil/find-field-name?field_name=${encodeURIComponent(fieldName)}`, {
      method: "GET",
    });

    const responseData = await response.json();

    if (responseData.success && responseData.data.length > 0) {
      const fieldData = responseData.data;

      // Populate the table with data
      fieldData.forEach((entry) => {
        const row = tableBody.insertRow();

        ["field_name", "zone_id", "is_outdoor", "soil_type", "pH", "organic_matter"].forEach((field, index) => {
          const cell = row.insertCell();
          cell.textContent = entry[index];
        });
      });

      resultMsg.textContent = "Field Name information displayed successfully!";
    } else {
      resultMsg.textContent = "No data found for the specified Field Name.";
    }
  } catch (error) {
    console.error("Error fetching field name information:", error);
    resultMsg.textContent = "An error occurred while fetching the data.";
  }
}


  
  // Initializes the webpage functionalities.
  window.onload = function () {
    checkDbConnection();
    fetchTableData();
    document
      .getElementById("resetLocationSoilTable")
      .addEventListener("click", resetLocationSoilTable);
    document
      .getElementById("insertLocationSoilForm")
      .addEventListener("submit", insertLocationSoil);
    document
      .getElementById("updateLocationSoilForm")
      .addEventListener("submit", updateLocationSoil);
    document
      .getElementById("deleteLocationSoilForm")
      .addEventListener("submit", deleteLocationSoil);
    document
      .getElementById("showGoodLocations")
      .addEventListener("click", fetchAndDisplayGoodLocations);
    document
      .getElementById("findSuperFields")
      .addEventListener("click", fetchAndDisplaySuperFields);
    document
      .getElementById("findFieldNameForm")
      .addEventListener("submit", fetchAndDisplayFieldName);
    // document
    //   .getElementById("countLocationSoilTable")
    //   .addEventListener("click", countLocationSoilTable);
  };
  
  // General function to refresh the displayed table data.
  function fetchTableData() {
    fetchAndDisplayLocationSoil();
  }
  