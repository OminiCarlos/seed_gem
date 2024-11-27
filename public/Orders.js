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

// Fetches data from the order table and displays it.
async function fetchAndDisplayOrders() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/orders/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  demotableContent.forEach((order) => {
    const row = tableBody.insertRow();

    // Adjust to the number of columns in the 'Order' table
    ["order_id", "order_date", "order_comment"].forEach((field) => {
      const cell = row.insertCell();
      cell.textContent = order[field];
    });
  });
}

// This function resets or initializes the order table.
async function resetDemotable() {
  const response = await fetch("/orders/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Order table initiated successfully!"
    : "Error initiating table!";
  fetchTableData();
}

// Inserts new records into the order table.
async function insertDemotable(event) {
  event.preventDefault();

  const orderData = {
    order_id: document.getElementById("insertOrderId").value,
    order_date: document.getElementById("insertOrderDate").value,
    order_comment: document.getElementById("insertOrderComment").value,
  };

  const response = await fetch("/orders/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Order inserted successfully!"
    : "Error inserting order!";
  fetchTableData();
}

// Updates order details in the order table.
async function updateOrderDemotable(event) {
  event.preventDefault();

  const orderData = {
    order_id: document.getElementById("updateOrderId").value,
    order_date: document.getElementById("updateOrderDate").value,
    order_comment: document.getElementById("updateOrderComment").value,
  };

  const response = await fetch("/orders/update-order-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("updateResultMsg");
  messageElement.textContent = responseData.success
    ? "Order updated successfully!"
    : "Error updating order!";
  fetchTableData();
}

// Deletes an order from the order table by Order ID.
async function deleteOrderDemotable(event) {
  event.preventDefault();

  const orderId = document.getElementById("deleteOrderId").value;

  const response = await fetch(`/orders/delete-order-demotable/${orderId}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Order deleted successfully!"
    : "Error deleting order!";
  fetchTableData();
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
    .getElementById("updateOrderDemotable")
    .addEventListener("submit", updateOrderDemotable);
  document
    .getElementById("deleteOrderDemotable")
    .addEventListener("submit", deleteOrderDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayOrders();
}
