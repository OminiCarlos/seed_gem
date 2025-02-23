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

// Fetches data from the event records table and displays it.
async function fetchAndDisplayUsers() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;

  tableBody.innerHTML = "";

  demotableContent.forEach((record) => {
    const row = tableBody.insertRow();

    [
      "event_id",
      "event_title",
      "event_date",
      "event_instruction",
      "event_observation",
      "batch_ID",
      "user_ID",
    ].forEach((field) => {
      const cell = row.insertCell();
      cell.textContent = record[field];
    });
  });
}

// This function resets the event records table.
async function resetDemotable() {
  const response = await fetch("/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Table reset successfully!"
    : "Error resetting table!";
  fetchTableData();
}

// Inserts a new event record into the table.
async function insertDemotable(event) {
  event.preventDefault();

  const recordData = {
    event_title: document.getElementById("insertEventTitle").value,
    event_date: document.getElementById("insertEventDate").value,
    event_instruction: document.getElementById("insertEventInstruction").value,
    event_observation: document.getElementById("insertEventObservation").value,
    batch_ID: document.getElementById("insertBatchId").value,
    user_ID: document.getElementById("insertUserId").value,
  };

  const response = await fetch("/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recordData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Record inserted successfully!"
    : "Error inserting record!";
  fetchTableData();
}

// Updates an event record in the table.
async function updateDemotable(event) {
  event.preventDefault();

  const recordData = {
    event_id: document.getElementById("updateEventId").value,
    event_title: document.getElementById("updateEventTitle").value,
    event_date: document.getElementById("updateEventDate").value,
    event_instruction: document.getElementById("updateEventInstruction").value,
    event_observation: document.getElementById("updateEventObservation").value,
    batch_ID: document.getElementById("updateBatchId").value,
    user_ID: document.getElementById("updateUserId").value,
  };

  const response = await fetch("/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recordData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Record updated successfully!"
    : "Error updating record!";
  fetchTableData();
}

// Deletes an event record from the table by Event ID.
async function deleteDemotable(event) {
  event.preventDefault();

  const eventId = document.getElementById("deleteEventId").value;

  const response = await fetch(`/delete-demotable/${eventId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Record deleted successfully!"
    : "Error deleting record!";
  fetchTableData();
}

// Counts rows in the event records table.
async function countDemotable() {
  const response = await fetch("/count-demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("countResultMsg");
  messageElement.textContent = responseData.success
    ? `Total records: ${responseData.count}`
    : "Error counting records!";
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
  document
    .getElementById("countDemotable")
    .addEventListener("click", countDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayUsers();
}
