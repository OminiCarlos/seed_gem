const express = require("express");
const appService = require("../appServices/UsersAppServices.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Fetch data from the user table
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchUserDemotableFromDb();
  res.json({ data: tableContent });
});

// Initialize the user table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateUserDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert a new user record
router.post("/insert-demotable", async (req, res) => {
  const { user_id, user_name, user_note } = req.body;

  const insertResult = await appService.insertUserDemotable(
    user_id,
    user_name,
    user_note
  );

  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an existing user record
router.post("/update-demotable", async (req, res) => {
  const { user_id, user_name, user_note } = req.body;

  const updateResult = await appService.updateUserDemotable(
    user_id,
    user_name,
    user_note
  );

  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete a user record by user ID
router.delete("/delete-demotable/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const deleteResult = await appService.deleteUserDemotable(user_id);

  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});


module.exports = router;
