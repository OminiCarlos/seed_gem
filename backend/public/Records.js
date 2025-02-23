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

// Fetches data from the event records table and displays it.
async function fetchAndDisplayEventRecords() {
  const tableBody = document.querySelector("#eventRecordsTable tbody");

  const response = await fetch("/records/event-records", {
    method: "GET",
  });

  const responseData = await response.json();
  const recordsContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  recordsContent
    .forEach((record) => {
      const row = tableBody.insertRow();

      [
        "event_id",
        "event_title",
        "event_date",
        "event_instruction",
        "event_observation",
        "batch_ID",
        "user_ID",
      ].forEach((field, index) => {
        const cell = row.insertCell();
        if (field === "event_date") {
          // Format the date field
          const date = new Date(record[index]);
          cell.textContent = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
        } else {
          cell.textContent = record[index];
        }
      });
    })
    .catch((error) => console.error("Error fetching table data:", error));
}

// This function resets or initializes the event records table.
async function resetEventRecords() {
  const response = await fetch("/records/initiate-event-records", {
    method: "POST",
  });

  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Event records table initialized successfully!"
    : "Error initializing table!";
  fetchTableData();
}

// Inserts new event records into the table.
async function insertEventRecord(event) {
  event.preventDefault();

  const recordData = {
    event_title: document.getElementById("insertEventTitle").value,
    event_date: document.getElementById("insertEventDate").value,
    event_instruction: document.getElementById("insertEventInstruction").value,
    event_observation: document.getElementById("insertEventObservation").value,
    batch_ID: document.getElementById("insertBatchId").value,
    user_ID: document.getElementById("insertUserId").value,
  };

  const response = await fetch("/records/insert-event-records", {
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
async function updateEventRecord(event) {
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

  const response = await fetch("/records/update-event-records", {
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
async function deleteEventRecord(event) {
  event.preventDefault();

  const eventId = document.getElementById("deleteEventId").value;

  const response = await fetch(`/records/delete-event-records/${eventId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Record deleted successfully!"
    : "Error deleting record!";
  fetchTableData();
}

// Initializes the webpage functionalities.
window.onload = function () {
  checkDbConnection();
  fetchTableData();
  document
    .getElementById("resetEventRecords")
    .addEventListener("click", resetEventRecords);
  document
    .getElementById("insertEventRecord")
    .addEventListener("submit", insertEventRecord);
  document
    .getElementById("updateEventRecord")
    .addEventListener("submit", updateEventRecord);
  document
    .getElementById("deleteEventRecord")
    .addEventListener("submit", deleteEventRecord);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayEventRecords();
}
