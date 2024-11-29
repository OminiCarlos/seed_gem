// Check the database connection status and update the frontend.
async function checkDbConnection() {
  const statusElem = document.getElementById("dbStatus");
  const loadingGifElem = document.getElementById("loadingGif");

  try {
    const response = await fetch("/check-db-connection", { method: "GET" });
    const text = await response.text();
    statusElem.textContent = text;
  } catch {
    statusElem.textContent = "Connection timed out";
  } finally {
    loadingGifElem.style.display = "none";
    statusElem.style.display = "inline";
  }
}

// Fetch and display all plants with their tags.
async function fetchAndDisplayTags() {
  const tableBody = document.querySelector("#demotable tbody");

  try {
    const response = await fetch("/planthastags/demotable", { method: "GET" });
    const { data } = await response.json();
    console.log(data);
    tableBody.innerHTML = ""; // Clear existing rows
    data.forEach((tuple) => {
      const row = tableBody.insertRow();
      tuple.forEach((tagInfo) => {
        const cell = row.insertCell();
        cell = tagInfo;
      })
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}

// Insert a new tag for a plant.
async function insertTag(event) {
  console.log("insert Tag triggered.");
  event.preventDefault();

  const tagData = {
    plant_id: document.getElementById("insertPlantId").value,
    tag: document.getElementById("insertTag").value
  }
  console.log(tagData.plant_id, tagData.tag);
  try {
    const response = await fetch("/planthastags/insert-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tagData),
    });

    const result = await response.json();
    document.getElementById("insertResultMsg").textContent = result.success
      ? "Tag inserted successfully!"
      : "Error inserting tag!";
    fetchAndDisplayTags();
  } catch (error) {
    console.error("Error inserting tag:", error);
  }
}

// Update an existing tag for a plant.
async function updateTag(event) {
  event.preventDefault();
  const tagData = {
    plant_id: document.getElementById("updatePlantId").value,
    oldTag: document.getElementById("updateOldTag").value,
    newTag: document.getElementById("updateNewTag").value
  }

  try {
    const response = await fetch("/planthastags/update-demotable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tagData),
    });

    const result = await response.json();
    document.getElementById("updateResultMsg").textContent = result.success
      ? "Tag updated successfully!"
      : "Error updating tag!";
    fetchAndDisplayTags();
  } catch (error) {
    console.error("Error updating tag:", error);
  }
}

// Deletes a tag from the demotable by Plant ID + Tag.
async function deleteDemotable(event) {
  event.preventDefault();

  const tagData = {
    plant_ID: document.getElementById("deletePlantId").value,
    tag: document.getElementById("deleteTag").value,
  };

  console.log(tagData);

  const response = await fetch("/plantHasTags/delete-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tagData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Tag deleted successfully!"
    : "Error deleting tag!";
  fetchAndDisplayTags();
}


// Initialize webpage functionality.
window.onload = function () {
  checkDbConnection();
  fetchAndDisplayTags();
  document.getElementById("insertDemotable").addEventListener("submit", insertTag);
  document.getElementById("updateDemotable").addEventListener("submit", updateTag);
  document.getElementById("deleteDemotable").addEventListener("submit", deleteTag);
};
