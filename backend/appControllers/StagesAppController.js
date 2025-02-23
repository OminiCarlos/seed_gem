const express = require("express");
const stagesAppService = require("../appServices/StagesAppServices.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints for the Stage table

// Fetch all stages
router.get("/demotable", async (req, res) => {
  try {
    const tableContent = await stagesAppService.fetchDemotableFromDb();
    res.json({ data: tableContent });
  } catch (err) {
    console.error("Error fetching stages:", err);
    res.status(500).json({ success: false });
  }
});

// Initialize the Stage table
router.post("/initiate-demotable", async (req, res) => {
  try {
    console.log("initiate-demotable requested");
    const initiateResult = await stagesAppService.initiateDemotable();
    if (initiateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (err) {
    console.error("Error initiating Stage table:", err);
    res.status(500).json({ success: false });
  }
});

router.post("/insert-demotable", async (req, res) => {
  try {
    const { plant_id, stage_name } = req.body;
    const insertResult = await stagesAppService.insertDemotable(plant_id, stage_name);
    if (insertResult) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid Plant ID or duplicate Stage." });
    }
  } catch (err) {
    console.error("Error inserting stage:", err);
    res.status(500).json({ success: false });
  }
});

// Update an existing stage
router.post("/update-demotable", async (req, res) => {
  try {
    const { stage_name, plant_id, new_stage_name } = req.body; // Adjust to the Stage table schema
    const updateResult = await stagesAppService.updateDemotable(stage_name, plant_id, new_stage_name);
    if (updateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (err) {
    console.error("Error updating stage:", err);
    res.status(500).json({ success: false });
  }
});

// 
router.post("/delete-demotable", async (req, res) => {
  try {
    const { plant_id, stage_name } = req.body; // Expecting JSON body
    const deleteResult = await stagesAppService.deleteDemotable(plant_id, stage_name);
    if (deleteResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (err) {
    console.error("Error deleting stage:", err);
    res.status(500).json({ success: false });
  }
});



module.exports = router;
