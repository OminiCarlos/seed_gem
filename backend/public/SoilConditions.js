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
  
  // Fetches data from the soil table and displays it.
  async function fetchAndDisplaySoilConditions() {
    const tableBody = document.querySelector("#soilTable tbody");
  
    const response = await fetch("/soilconditions/demotable", {
      method: "GET",
    });
  
    const responseData = await response.json();
    const soilTableContent = responseData.data;
  
    // Clear existing table rows
    tableBody.innerHTML = "";
  
    // Populate the table with data
    soilTableContent.forEach((soilCondition) => {
      const row = tableBody.insertRow();
  
      ["soil_type", "ph", "organic_matter"].forEach((field,index) => {
        const cell = row.insertCell();
        cell.textContent = soilCondition[index];
      });
    });
  }
  
  // This function resets or initializes the soil condition table.
  async function resetDemotable() {
    const response = await fetch("/soilconditions/initiate-demotable", {
      method: "POST",
    });
    const responseData = await response.json();
  
    const messageElement = document.getElementById("resetResultMsg");
    messageElement.textContent = responseData.success
      ? "Soil condition table reset successfully!"
      : "Error resetting soil condition table!";
    fetchTableData();
  }
  
  // Inserts new records into the soil condition table.
  async function insertDemotable(event) {
    event.preventDefault();
  
    const soilData = {
      soil_type: document.getElementById("insertSoilType").value,
      ph: parseFloat(document.getElementById("insertSoilPh").value),
      organic_matter: parseFloat(
        document.getElementById("insertOrganicMatter").value
      ),
    };
  
    const response = await fetch("/soilconditions/insert-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(soilData),
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("insertResultMsg");
    messageElement.textContent = responseData.success
      ? "Data inserted successfully!"
      : "Error inserting data!";
    fetchTableData();
  }
  
  // Updates soil condition details in the table.
  async function updateSoilDemotable(event) {
    event.preventDefault();
  
    const soilData = {
      soil_type: document.getElementById("updateSoilType").value,
      ph: parseFloat(document.getElementById("updateSoilPh").value),
      organic_matter: parseFloat(
        document.getElementById("updateOrganicMatter").value
      ),
    };
  
    const response = await fetch("/soilconditions/update-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(soilData),
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("updateResultMsg");
    messageElement.textContent = responseData.success
      ? "Soil condition updated successfully!"
      : "Error updating soil condition!";
    fetchTableData();
  }
  
  // Deletes a soil condition from the table by Soil Type.
  async function deleteSoilDemotable(event) {
    event.preventDefault();
  
    const soilType = document.getElementById("deleteSoilType").value;
  
    const response = await fetch(`/soilconditions/delete-demotable/${soilType}`, {
      method: "DELETE",
    });
  
    const responseData = await response.json();
    const messageElement = document.getElementById("deleteResultMsg");
    messageElement.textContent = responseData.success
      ? "Soil condition deleted successfully!"
      : "Error deleting soil condition!";
    fetchTableData();
  }
  
  // Counts rows in the soil condition table.
//   async function countSoilConditions() {
//     const response = await fetch("/soil-condition/count", {
//       method: "GET",
//     });
  
//     const responseData = await response.json();
//     const messageElement = document.getElementById("countResultMsg");
//     messageElement.textContent = responseData.success
//       ? `The number of tuples in soil condition table: ${responseData.count}`
//       : "Error in counting soil conditions!";
//   }


// SELECTION / filter
// Adds a new condition row to the filter form
document.getElementById("addCondition").addEventListener("click", () => {
  const conditionRow = document.querySelector(".filter-row").cloneNode(true);
  document.getElementById("filterConditions").appendChild(conditionRow);
});

// Handles the filter form submission
document.getElementById("filterSoilForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Collect all conditions
  const conditionRows = document.querySelectorAll(".filter-row");
  const conditions = [];
  conditionRows.forEach((row) => {
    const attribute = row.querySelector(".filter-attribute").value;
    const operator = row.querySelector(".filter-operator").value;
    const value = row.querySelector(".filter-value").value;
    conditions.push(`${attribute} ${operator} '${value}'`);
  });

  // Combine conditions with AND/OR
  const combineWith = document.getElementById("filterCombine").value;
  const queryConditions = conditions.join(` ${combineWith} `);

  // Send the filter query to the backend
  const response = await fetch(`/soilconditions/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conditions: queryConditions }),
  });

  const responseData = await response.json();
  const resultMsg = document.getElementById("filterResultMsg");

  if (responseData.success) {
    displayFilteredResults(responseData.data);
    resultMsg.textContent = "Filter applied successfully!";
  } else {
    resultMsg.textContent = "Error applying filter.";
  }
});

// Displays filtered results in the table
function displayFilteredResults(data) {
  const tableBody = document.querySelector("#soilTable tbody");
  tableBody.innerHTML = "";

  data.forEach((row) => {
    const tableRow = tableBody.insertRow();
    Object.values(row).forEach((value) => {
      const cell = tableRow.insertCell();
      cell.textContent = value;
    });
  });
}



  
  // Initializes the webpage functionalities.
  window.onload = function () {
    checkDbConnection();
    fetchTableData();
    document
      .getElementById("resetSoilTable")
      .addEventListener("click", resetDemotable);
    document
      .getElementById("insertSoilForm")
      .addEventListener("submit", insertDemotable);
    document
      .getElementById("updateSoilForm")
      .addEventListener("submit", updateSoilDemotable);
    document
      .getElementById("deleteSoilForm")
      .addEventListener("submit", deleteSoilDemotable);
    // document
    //   .getElementById("countSoilTable")
    //   .addEventListener("click", countSoilConditions);
  };
  
  // General function to refresh the displayed table data.
  function fetchTableData() {
    fetchAndDisplaySoilConditions();
  }
  