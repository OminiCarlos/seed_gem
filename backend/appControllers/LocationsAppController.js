const express = require("express");
//----------update to correspondant xxxAppService
// common JS 

const appService = require("../appServices/LocationsAppServices.js"); // replace with the correspondant xxxAppService.js
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// start adding new routes here!
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

router.get("/list-field-name", async (req, res) => {
  console.log("field_name_called");
  const fieldNames = await appService.listFieldNames();
  res.json(fieldNames);
});


// inititate table
router.post("/initiate-demotable", async (req, res) => {
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
  const { field_name, zone_id, is_outdoor, is_irrigated } = req.body;
  const insertResult = await appService.insertDemotable(
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
  const updateResult = await appService.updateDemotable(
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

// Filter locations by indoor/outdoor
router.get("/filter-demotable", async (req, res) => {
  const { showOutdoor, showIndoor } = req.query;

  // Convert query parameters to booleans
  const filterOutdoor = showOutdoor;
  const filterIndoor = showIndoor;

  // Fetch filtered data from the service
  const filteredData = await appService.filterDemotable(filterOutdoor, filterIndoor);

  if (filteredData) {
    res.json({ data: filteredData });
  } else {
    res.status(500).json({ success: false, message: "Error fetching filtered data" });
  }
});


//delete one entry
router.delete("/delete-demotable/:field_name/:zone_id", async (req, res) => {
  const { field_name, zone_id } = req.params;
  // console.log(field_name, zone_id);
  const deleteResult = await appService.deleteDemotable(
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
