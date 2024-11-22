const express = require("express");
//----------update to correspondant xxxAppService
const appService = require("../appServices/LocationsAppServices.js"); // replace with the correspondant xxxAppService.js
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// start adding new routes here!
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchLocationDemotableFromDb();
  res.json({ data: tableContent });
});

// inititate table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateLocationDemotable();
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
  const { field_name, zone_id, is_outdoor, is_irrigated } = req.body;
  const insertResult = await appService.insertLocationDemotable(
    field_name,
    zone_id,
    is_outdoor ? 1 : 0,
    is_irrigated ? 1 : 0
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

//update one entry
router.post("/update-demotable", async (req, res) => {
  const { field_name, zone_id, is_outdoor } = req.body;
  const updateResult = await appService.updateLocationDemotable(
    field_name,
    zone_id,
    is_outdoor ? 1 : 0
  );
  console.log(updateResult);
  if (updateResult) {
    // console.log("REACHED here");
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

//delete one entry
router.delete("/delete-demotable/:field_name/:zone_id", async (req, res) => {
  const { field_name, zone_id } = req.params;
  // console.log(field_name, zone_id);
  const deleteResult = await appService.deleteLocationDemotable(
    field_name,
    zone_id
  );
  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
