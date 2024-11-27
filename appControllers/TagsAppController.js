const express = require("express");
//----------update to correspondant xxxAppService
const appService = require("../appServices/TagsAppServices.js"); // replace with the correspondant xxxAppService.js
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
  const { tag } = req.body;
  const insertResult = await appService.insertDemotable(
    tag 
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});


//delete one entry
router.delete("/delete-demotable/:tag", async (req, res) => {
  const { tag } = req.params;
  console.log(`tag is ${tag}`)
  const deleteResult = await appService.deleteDemotable(
    tag
  );
  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
