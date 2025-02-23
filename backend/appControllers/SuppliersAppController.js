const express = require("express");
const appService = require("../appServices/SuppliersAppServices.js"); // Replace with the appropriate service
const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Fetch data from the suppliers table
router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchSupplierDemotableFromDb();
  res.json({ data: tableContent });
});

// Initialize the suppliers table
router.post("/initiate-demotable", async (req, res) => {
  const initiateResult = await appService.initiateSupplierDemotable();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Insert a new supplier record
router.post("/insert-demotable", async (req, res) => {
  const { supplier_id, supplier_name, supplier_address, supplier_tel } =
    req.body;

  const insertResult = await appService.insertSupplierDemotable(
    supplier_id,
    supplier_name,
    supplier_address,
    supplier_tel
  );

  if (insertResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Update an existing supplier record
router.post("/update-demotable", async (req, res) => {
  const { supplier_id, supplier_name, supplier_address, supplier_tel } =
    req.body;

  const updateResult = await appService.updateSupplierDemotable(
    supplier_id,
    supplier_name,
    supplier_address,
    supplier_tel
  );

  if (updateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

// Delete a supplier record by supplier ID
router.delete("/delete-demotable/:supplier_id", async (req, res) => {
  const { supplier_id } = req.params;
  const deleteResult = await appService.deleteSupplierDemotable(supplier_id);

  if (deleteResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
