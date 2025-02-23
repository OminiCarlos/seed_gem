// Check database connection and update status on the frontend
async function checkDbConnection() {
  const statusElem = document.getElementById("dbStatus");
  const loadingGifElem = document.getElementById("loadingGif");

  try {
    const response = await fetch("/check-db-connection", { method: "GET" });
    const text = await response.text();
    loadingGifElem.style.display = "none";
    statusElem.style.display = "inline";
    statusElem.textContent = text;
  } catch (error) {
    loadingGifElem.style.display = "none";
    statusElem.textContent = "Connection timed out";
    console.error("Error checking database connection:", error);
  }
}



// Fetch data from the order_item table and display it
async function fetchAndDisplayOrderItems() {
  const tableBody = document.querySelector("#demotable tbody");

  try {
    const response = await fetch("/order-items/demotable", { method: "GET" });
    if (!response.ok) throw new Error("Failed to fetch order items");

    const { data } = await response.json();

    // Clear the existing table rows
    tableBody.innerHTML = "";

    // Populate the table with data
    data.forEach(orderItem => {
      const row = tableBody.insertRow();
      orderItem.forEach((field, index) => {
        const cell = row.insertCell();

        // Format numerical fields
        if (index === 3 || index === 5) { // Assuming Quantity (index 3) and Item Price (index 5)
          cell.textContent = parseFloat(field).toFixed(2);
        } else {
          cell.textContent = field || ""; // Handle empty/null values
        }
      });
    });
  } catch (error) {
    console.error("Error fetching and displaying orders:", error);
  }
}

// Insert a new record into the order_item table
async function insertOrderItem(event) {
  event.preventDefault();

  const orderItemData = {
    order_ID: document.getElementById("insertOrderId").value,
    item_ID: document.getElementById("insertItemID").value,
    plant_ID: document.getElementById("insertPlantId").value,
    quantity: document.getElementById("insertItemQuantity").value,
    unit: document.getElementById("insertItemUnit").value,
    item_price: document.getElementById("insertItemPrice").value,
    supplier_ID: document.getElementById("insertSupplierId").value,
    item_comment: document.getElementById("insertItemComment").value,
  };

  try {
    const response = await fetch("/order-items/insert-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItemData)
    });

    const result = await response.json();
    const messageElement = document.getElementById("insertResultMsg");
    messageElement.textContent = result.success
      ? "Order item inserted successfully!"
      : "Error inserting order item.";
    fetchAndDisplayOrderItems();
  } catch (error) {
    console.error("Error inserting order item:", error);
  }
}

// Update an existing record in the order_item table
async function updateOrderItem(event) {
  event.preventDefault();

  const orderItemData = {
    order_ID: document.getElementById("updateOrderId").value,
    item_ID: document.getElementById("updateItemID").value,
    plant_ID: document.getElementById("updatePlantId").value,
    quantity: document.getElementById("updateItemQuantity").value,
    unit: document.getElementById("updateItemUnit").value,
    item_price: document.getElementById("updateItemPrice").value,
    supplier_ID: document.getElementById("updateSupplierId").value,
    item_comment: document.getElementById("updateItemComment").value,
  };

  try {
    const response = await fetch("/order-items/update-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItemData)
    });

    const result = await response.json();
    const messageElement = document.getElementById("updateResultMsg");
    messageElement.textContent = result.success
      ? "Order item updated successfully!"
      : "Error updating order item.";
    fetchAndDisplayOrderItems();
  } catch (error) {
    console.error("Error updating order item:", error);
  }
}

// Delete a record from the order_item table using a JSON payload
async function deleteOrderItem(event) {
  event.preventDefault();

  const orderItemData = {
    order_ID: document.getElementById("deleteOrderId").value,
    item_ID: document.getElementById("deleteItemId").value,
  };

  try {
    const response = await fetch("/order-items/delete-demotable", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItemData),
    });

    const result = await response.json();
    const messageElement = document.getElementById("deleteResultMsg");
    messageElement.textContent = result.success
      ? "Order item deleted successfully!"
      : "Error deleting order item.";
    fetchAndDisplayOrderItems();
  } catch (error) {
    console.error("Error deleting order item:", error);
  }
}


// Initialize the page functionalities
window.onload = function() {
  checkDbConnection();
  fetchAndDisplayOrderItems();

  document
    .getElementById("insertDemotable")
    .addEventListener("submit", insertOrderItem);

  document
    .getElementById("updateDemotable")
    .addEventListener("submit", updateOrderItem);

  document
    .getElementById("deleteDemotable")
    .addEventListener("submit", deleteOrderItem);
};
