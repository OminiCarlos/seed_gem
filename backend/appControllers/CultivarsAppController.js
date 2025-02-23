const express = require("express");
const appService = require("../appServices/CultivarsAppService.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints for Cultivars

// Fetch all cultivars
router.get("/demotable", async (req, res) => {
  try {
    const tableContent = await appService.fetchCultivarsFromDb();
    res.json({ data: tableContent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cultivars." });
  }
});

// Initialize the Cultivar table
router.post("/initiate-demotable", async (req, res) => {
  try {
    const initiateResult = await appService.initiateCultivarTable();
    if (initiateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to initialize table." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error initiating table." });
  }
});

// Insert a new cultivar
router.post("/insert-demotable", async (req, res) => {
  const { plant_ID, cultivar_name } = req.body;

  try {
    const insertResult = await appService.insertCultivar(plant_ID, cultivar_name);
    if (insertResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to insert cultivar." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error inserting cultivar." });
  }
});

// Update a cultivar
router.post("/update-demotable", async (req, res) => {
  const { plant_ID, cultivar_name } = req.body;

  try {
    const updateResult = await appService.updateCultivar(plant_ID, cultivar_name);
    if (updateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to update cultivar." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating cultivar." });
  }
});

// Delete a cultivar by Plant ID
router.delete("/delete-demotable/:plant_ID", async (req, res) => {
  const { plant_ID } = req.params;

  try {
    const deleteResult = await appService.deleteCultivar(plant_ID);
    if (deleteResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: "Failed to delete cultivar." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting cultivar." });
  }
});

// Count the rows in the Cultivar table
// router.get("/count", async (req, res) => {
//   try {
//     const countResult = await appService.countCultivars();
//     if (countResult !== null) {
//       res.json({ success: true, count: countResult });
//     } else {
//       res.status(500).json({ success: false, message: "Failed to count cultivars." });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error counting cultivars." });
//   }
// });

module.exports = router;
