const express = require("express");
const appService = require("../appServices/BatchesAppServices.js"); // Replace with the appropriate service
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Fetch data from the batches table
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchBatchDemotableFromDb();
  res.json({ data: tableContent });
});

// Initialize the batches table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateBatchDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert a new batch record
router.post("/insert-demotable", async (req, res) => {
  const {
    batch_id,
    care_notes,
    plant_date,
    yield_weight,
    planted_quantity,
    survived_quantity,
    item_id,
    order_id,
    field_name,
    zone_id,
  } = req.body;

  const insertResult = await appService.insertBatchDemotable(
    batch_id,
    care_notes,
    plant_date,
    yield_weight,
    planted_quantity,
    survived_quantity,
    item_id,
    order_id,
    field_name,
    zone_id
  );

  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an existing batch record
router.post("/update-demotable", async (req, res) => {
  const {
    batch_id,
    care_notes,
    plant_date,
    yield_weight,
    planted_quantity,
    survived_quantity,
    item_id,
    order_id,
    field_name,
    zone_id,
  } = req.body;

  const updateResult = await appService.updateBatchDemotable(
    batch_id,
    care_notes,
    plant_date,
    yield_weight,
    planted_quantity,
    survived_quantity,
    item_id,
    order_id,
    field_name,
    zone_id
  );

  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete a batch record by batch ID
router.delete("/delete-demotable/:batch_id", async (req, res) => {
  const { batch_id } = req.params;
  const deleteResult = await appService.deleteBatchDemotable(batch_id);

  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
