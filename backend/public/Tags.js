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
async function fetchAndDisplayTags() {
  const tableBody = document.querySelector("#demotable tbody");

  const response = await fetch("/tags/demotable", {
    method: "GET",
  });

  const responseData = await response.json();
  const demotableContent = responseData.data;
  console.log(demotableContent);

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  // TODO: tag is the tuple of the demotableContent
  demotableContent.forEach((tag) => {
    const row = tableBody.insertRow();

    // TODO: Adjust to the number of columns in the 'Tag' table
    [
      "tag",
    ].forEach((field, index) => {
      const cell = row.insertCell();
      cell.textContent = tag[index];
    });
  });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
  const response = await fetch("/tags/initiate-demotable", {
    method: "POST",
  });
  const responseData = await response.json();

  const messageElement = document.getElementById("resetResultMsg");
  messageElement.textContent = responseData.success
    ? "Tags table initiated successfully!"
    : "Error initiating tags table!";
  fetchTableData();
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
  event.preventDefault();
  // TODO
  const tagsData = {
    tag: document.getElementById("insertTag").value,
  };

  const response = await fetch("/tags/insert-demotable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tagsData),
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("insertResultMsg");
  messageElement.textContent = responseData.success
    ? "Data inserted successfully!"
    : "Error inserting data!";
  fetchTableData();
}


// Deletes a tag from the demotable by Tag ID.
async function deleteTagDemotable(event) {
  console.log(`deleteTagDemotable triggered `)
  event.preventDefault();

  const tag = document.getElementById("deleteTag").value;

  const response = await fetch(`/tags/delete-demotable/${tag}`, {
    method: "DELETE",
  });

  const responseData = await response.json();
  const messageElement = document.getElementById("deleteResultMsg");
  messageElement.textContent = responseData.success
    ? "Tag deleted successfully!"
    : "Error deleting tag!";
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
    .getElementById("deleteTags")
    .addEventListener("submit", deleteTagDemotable);
};

// General function to refresh the displayed table data.
function fetchTableData() {
  fetchAndDisplayTags();
}
