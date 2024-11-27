const express = require("express");
//----------update to correspondant xxxAppService
const appService = require("../appServices/OrdersAppServices.js"); // replace with the correspondant xxxAppService.js
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
  const initiateResult = await appService.initiateDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// insert one entry
router.post("/insert-demotable", async (req, res) => {
  console.log("insert order demotable")
  const {order_id, order_date, order_comment} = req.body;
  const insertResult = await appService.insertDemotable(
    order_id,
    order_date,
    order_comment
  );
  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

//update one entry
router.post("/update-demotable", async (req, res) => {
  const { order_id, order_date, order_comment } = req.body;
  const updateResult = await appService.updateDemotable(
    order_id,
    order_date,
    order_comment
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
router.delete("/delete-demotable/:order_id", async (req, res) => {
  const { order_id } = req.params;
  // console.log(field_name, zone_id);
  const deleteResult = await appService.deleteDemotable(
    order_id
  );
  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
