const express = require("express");
const appService = require("../appServices/OrderItemsAppServices.js"); // Correct import for OrderItemsAppServices
const router = express.Router();

// ----------------------------------------------------------
// API endpoints for Order Items

// Fetch all order items
router.get("/demotable", async (req, res) => {
  try {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({ data: tableContent });
  } catch (error) {
    console.error("Error fetching order items:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch order items" });
  }
});

// Initiate order items table
router.post("/initiate-demotable", async (req, res) => {
  try {
    const initiateResult = await appService.initiateDemotable();
    res.json({ success: !!initiateResult });
  } catch (error) {
    console.error("Error initiating order items table:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to initiate order items table"
      });
  }
});

// Insert a new order item
router.post("/insert-demotable", async (req, res) => {
  try {
    const {
      order_ID,
      item_ID,
      plant_ID,
      quantity,
      unit,
      item_price,
      supplier_ID,
      item_comment
    } = req.body;

    const insertResult = await appService.insertDemotable(
      order_ID,
      item_ID,
      plant_ID,
      quantity,
      unit,
      item_price,
      supplier_ID,
      item_comment
    );

    res.json({ success: !!insertResult });
  } catch (error) {
    console.error("Error inserting order item:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to insert order item" });
  }
});

// Update an existing order item
router.post("/update-demotable", async (req, res) => {
  try {
    const {
      order_ID,
      item_ID,
      plant_ID,
      quantity,
      unit,
      item_price,
      supplier_ID,
      item_comment
    } = req.body;

    const updateResult = await appService.updateDemotable(
      order_ID,
      item_ID,
      plant_ID,
      quantity,
      unit,
      item_price,
      supplier_ID,
      item_comment
    );

    res.json({ success: !!updateResult });
  } catch (error) {
    console.error("Error updating order item:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update order item" });
  }
});

// Delete an order item
router.delete("/delete-demotable", async (req, res) => {
  try {
    const { order_ID, item_ID } = req.body;

    const deleteResult = await appService.deleteDemotable(order_ID, item_ID);
    res.json({ success: !!deleteResult });
  } catch (error) {
    console.error("Error deleting order item:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete order item" });
  }
});

module.exports = router;
