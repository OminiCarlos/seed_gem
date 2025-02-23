const express = require("express");
//----------update to correspondant xxxAppService
const appService = require("../appServices/PlantsAppServices.js"); // replace with the correspondant xxxAppService.js
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// start adding new routes here!
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

// inititate table
router.post("/initiate-demotable", async (req, res) => {
  console.log("initiate-demotable requested");
  const initiateResult = await appService.initiateDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// insert one entry
router.post("/insert-demotable", async (req, res) => {
  // console.log("REACHED HERE:")
  // console.log(req.body);
  const { plant_id, yield_type, common_name, scientific_name, overview_notes } =
    req.body;
  const insertResult = await appService.insertDemotable(
    plant_id,
    yield_type,
    common_name,
    scientific_name,
    overview_notes
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

//update one entry
router.post("/update-demotable", async (req, res) => {
  const { plant_id, yield_type, common_name, scientific_name, overview_notes } =
    req.body;
  const updateResult = await appService.updateDemotable(
    plant_id,
    yield_type,
    common_name,
    scientific_name,
    overview_notes
  );
  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

//delete one entry
router.delete("/delete-demotable/:plant_id", async (req, res) => {
  const { plant_id } = req.params;
  // console.log(field_name, zone_id);
  const deleteResult = await appService.deleteDemotable(plant_id);
  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.get("/count-demotable", async (req, res) => {
  const tableCount = await appService.countDemotable();
  if (tableCount >= 0) {
    res.json({
      success: true,
      count: tableCount,
    });
  } else {
    res.status(500).json({
      success: false,
      count: tableCount,
    });
  }
});

router.get("/count-fruit-yielding-plants", async (req, res) => {
  const count = await appService.countFruitYieldingPlants();
  if (count >= 0) {
    res.json({
      success: true,
      count: count,
    });
  } else {
    res.status(500).json({
      success: false,
    });
  }
});

// Fetch count of plants grouped by yield_type
router.get("/yield-type-count", async (req, res) => {
  try {
    const yieldTypeCounts = await appService.getYieldTypeCounts();
    if (yieldTypeCounts) {
      res.json({ data: yieldTypeCounts });
    } else {
      res.status(500).json({ success: false, message: "No data available" });
    }
  } catch (error) {
    console.error("Error fetching yield type counts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Fetch count of plants with "care" in overview_notes, grouped by yield_type
router.get("/care-count", async (req, res) => {
  try {
    const careCountData = await appService.getCareCountByYieldType();
    if (careCountData) {
      res.json({ data: careCountData });
    } else {
      res.status(500).json({ success: false, message: "No data available" });
    }
  } catch (error) {
    console.error("Error fetching care count data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



module.exports = router;
