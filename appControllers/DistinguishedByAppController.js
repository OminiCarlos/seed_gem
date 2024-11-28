const express = require("express");
// Replace with the corresponding DistinguishedByAppService
const appService = require("../appServices/DistinguishedByAppService.js");
const router = express.Router();

// ----------------------------------------------------------
// API endpoints for location distinguished by soil

// Fetch all entries
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDistinguishedByFromDb();
  res.json({ data: tableContent });
});

// Initialize/reset the table
router.post("/initiate-demotable", async (req, res) => {
  const resetResult = await appService.resetDistinguishedByTable();
  if (resetResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert an entry
router.post("/insert-demotable", async (req, res) => {
  const { field_name, zone_id, soil_type } = req.body;
  const insertResult = await appService.insertDistinguishedBy(
    field_name,
    zone_id,
    soil_type
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an entry
router.post("/update-demotable", async (req, res) => {
  const { field_name, zone_id, old_soil_type, new_soil_type } = req.body;
  const updateResult = await appService.updateDistinguishedBy(
    field_name,
    zone_id,
    old_soil_type,
    new_soil_type
  );
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete an entry by field name and zone ID
router.post("/delete-demotable", async (req, res) => {
    const { field_name, zone_id, soil_type } = req.body;
    const deleteResult = await appService.deleteDistinguishedBy(
      field_name,
      zone_id,
      soil_type
    );
    if (deleteResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  });


// Count all entries
router.get("/count", async (req, res) => {
  const countResult = await appService.countDistinguishedBy();
  if (countResult !== null) {
    res.json({ success: true, count: countResult });
  } else {
    res.status(500).json({ success: false });
  }
});


// Fetch good locations
router.get("/good-locations", async (req, res) => {
  try {
    const goodLocations = await appService.fetchGoodLocations();
    res.json({ success: true, data: goodLocations });
  } catch (error) {
    console.error("Error fetching good locations:", error);
    res.status(500).json({ success: false });
  }
});


// Fetch super fields
router.get("/super-fields", async (req, res) => {
  try {
    const superFields = await appService.fetchSuperFields();
    res.json({ success: true, data: superFields });
  } catch (error) {
    console.error("Error fetching super fields:", error);
    res.status(500).json({ success: false });
  }
});




module.exports = router;
