const express = require("express");
const appService = require("../appServices/RecordsAppServices.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Fetch data from the plant event records table
router.get("/event-records", async (req, res) => {
  const tableContent = await appService.fetchEventRecordsFromDb();
  res.json({ data: tableContent });
});

// Initialize the plant event records table
router.post("/initiate-event-records", async (req, res) => {
  const initiateResult = await appService.initiateEventRecords();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert a new plant event record
router.post("/insert-event-records", async (req, res) => {
  const {
    event_title,
    event_date,
    event_instruction,
    event_observation,
    batch_ID,
    user_ID,
  } = req.body;

  const insertResult = await appService.insertEventRecord(
    event_title,
    event_date,
    event_instruction,
    event_observation,
    batch_ID,
    user_ID
  );

  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an existing plant event record
router.post("/update-event-records", async (req, res) => {
  const {
    event_id,
    event_title,
    event_date,
    event_instruction,
    event_observation,
    batch_ID,
    user_ID,
  } = req.body;

  const updateResult = await appService.updateEventRecord(
    event_id,
    event_title,
    event_date,
    event_instruction,
    event_observation,
    batch_ID,
    user_ID
  );

  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete a plant event record by event ID
router.delete("/delete-event-records/:event_id", async (req, res) => {
  const { event_id } = req.params;
  const deleteResult = await appService.deleteEventRecord(event_id);

  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
