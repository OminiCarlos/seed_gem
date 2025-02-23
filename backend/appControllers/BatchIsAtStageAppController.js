const express = require("express");
const appService = require("../appServices/BatchIsAtStageAppServices.js"); // Replace with the appropriate service
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Fetch data from the batch_is_at_stage table
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchBatchStagesFromDb();
  res.json({ data: tableContent });
});

// Initialize the batch_is_at_stage table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateBatchStages();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert a new batch stage record
router.post("/insert-demotable", async (req, res) => {
  const { batch_ID, plant_ID, stage_name, start_date, end_date } = req.body;

  const insertResult = await appService.insertBatchStage(
    batch_ID,
    plant_ID,
    stage_name,
    start_date,
    end_date
  );

  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an existing batch stage record
router.post("/update-demotable", async (req, res) => {
  const { batch_ID, plant_ID, stage_name, start_date, end_date } = req.body;

  const updateResult = await appService.updateBatchStage(
    batch_ID,
    plant_ID,
    stage_name,
    start_date,
    end_date
  );

  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete a batch stage record by batch ID, plant ID, and stage name
router.delete(
  "/delete-demotable/:batch_ID/:plant_ID/:stage_name",
  async (req, res) => {
    const { batch_ID, plant_ID, stage_name } = req.params;
    const deleteResult = await appService.deleteBatchStage(
      batch_ID,
      plant_ID,
      stage_name
    );

    if (deleteResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
