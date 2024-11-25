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
  
      ["field_name", "zone_id", "soil_type"].forEach((field,index) => {
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
    // document
    //   .getElementById("countLocationSoilTable")
    //   .addEventListener("click", countLocationSoilTable);
  };
  
  // General function to refresh the displayed table data.
  function fetchTableData() {
    fetchAndDisplayLocationSoil();
  }
  