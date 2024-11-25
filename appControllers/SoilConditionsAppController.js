const express = require("express");
// Replace with the corresponding SoilConditionsAppService
const appService = require("../appServices/SoilConditionsAppService.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints for soil conditions
// Fetch all soil conditions
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchSoilConditionsFromDb();
  res.json({ data: tableContent });
});

// Initialize/reset the soil condition table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.resetSoilConditionsTable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert one soil condition entry
router.post("/insert-demotable", async (req, res) => {
  const { soil_type, ph, organic_matter } = req.body;
  const insertResult = await appService.insertSoilCondition(
    soil_type,
    parseFloat(ph),
    parseFloat(organic_matter)
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update one soil condition entry
router.post("/update-demotable", async (req, res) => {
  const { soil_type, ph, organic_matter } = req.body;
  const updateResult = await appService.updateSoilCondition(
    soil_type,
    parseFloat(ph),
    parseFloat(organic_matter)
  );
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete one soil condition entry by soil_type
router.delete("/delete-demotable/:soil_type", async (req, res) => {
  const { soil_type } = req.params;
  const deleteResult = await appService.deleteSoilCondition(soil_type);
  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Count all soil condition entries
// router.get("/count", async (req, res) => {
//   const countResult = await appService.countSoilConditions();
//   if (countResult !== null) {
//     res.json({ success: true, count: countResult });
//   } else {
//     res.status(500).json({ success: false });
//   }
// });

module.exports = router;
