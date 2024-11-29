const express = require("express");
const appService = require("../appServices/PlantHasTagsAppServices.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints

// Check database connection status
router.get("/check-db-connection", async (req, res) => {
  try {
    const connectionStatus = await appService.checkDbConnection();
    res
      .status(200)
      .send(
        connectionStatus ? "Database Connected" : "Database Connection Failed"
      );
  } catch (error) {
    res.status(500).send("Database Connection Error");
  }
});

// Fetch all records from the plant_has_tags table
router.get("/demotable", async (req, res) => {
  try {
    const tableContent = await appService.fetchPlantTagsFromDb();
    res.json({ data: tableContent });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Insert a new tag for a plant
router.post("/insert-demotable", async (req, res) => {
  const { plant_id, tag } = req.body;

  try {
    const insertResult = await appService.insertPlantTag(plant_id, tag);
    if (insertResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to insert tag" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error inserting tag" });
  }
});

// Update an existing tag for a plant
router.post("/update-demotable", async (req, res) => {
  const { plant_id, oldTag, newTag } = req.body;

  try {
    const updateResult = await appService.updatePlantTag(
      plant_id,
      oldTag,
      newTag
    );
    if (updateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to update tag" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating tag" });
  }
});

// Delete a tag from the plant_has_tags table
router.post("/delete-demotable", async (req, res) => {
  const { plant_ID, tag } = req.body;

  try {
    const deleteResult = await appService.deletePlantTag(plant_ID, tag);
    if (deleteResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to delete tag" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting tag" });
  }
});

module.exports = router;
