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

// Fetches data from the user table and displays it.
async function fetchAndDisplayUsers() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/users/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((user) => {
    const row = tableBody.insertRow();

    ["user_id", "user_name", "user_note"].forEach((field) => {
      const cell = row.insertCell();
      cell.textContent = user[field];
    });
  });
}

// This function resets or initializes the user table.
async function resetDemotable() {
  const response = await fetch("/users/initiate-demotable", {
    method: "POST",
  });

  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Demotable initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new user records into the user table.
async function insertDemotable(event) {
  event.preventDefault();

  const userData = {
    user_id: document.getElementById("insertUserId").value,
    user_name: document.getElementById("insertUserName").value,
    user_note: document.getElementById("insertUserNote").value,
  };

  const response = await fetch("/users/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}

// Updates user details in the user table.
async function updateUserDemotable(event) {
  event.preventDefault();

  const userData = {
    user_id: document.getElementById("updateUserId").value,
    user_name: document.getElementById("updateUserName").value,
    user_note: document.getElementById("updateUserNote").value,
  };

  const response = await fetch("/users/update-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "User updated successfully!"
    : "Error updating user!";
  fetchTableData();
}

// Deletes a user from the user table by User ID.
async function deleteUserDemotable(event) {
  event.preventDefault();

  const userId = document.getElementById("deleteUserId").value;

  const response = await fetch(`/users/delete-demotable/${userId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "User deleted successfully!"
    : "Error deleting user!";
  fetchTableData();
}

// Counts rows in the user table.
async function countDemotable() {
  const response = await fetch("/users/count-demotable", {
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
    .getElementById("updateUserDemotable")
    .addEventListener("submit", updateUserDemotable);
  document
    .getElementById("deleteUserDemotable")
    .addEventListener("submit", deleteUserDemotable);
  document
    .getElementById("countDemotable")
    .addEventListener("click", countDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayUsers();
}
