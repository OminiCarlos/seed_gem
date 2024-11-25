const express = require("express");
const appService = require("./appService");
// ------------------------step 1: import sub appControllers---------
const locationsController = require("./appControllers/LocationsAppController"); // Import the Locations controller
const batchesController = require("./appControllers/BatchesAppController"); // Import the Batches controller
const suppliersController = require("./appControllers/SuppliersAppController"); // Import the Suppliers controller
const usersController = require("./appControllers/UsersAppController"); // Import the Users controller

//------------------step 2: load routers below -----------------------
const router = express.Router();

router.use("/locations", locationsController); // Mount Locations routes
router.use("/batches", batchesController); // Mount Batches routes
router.use("/suppliers", suppliersController); // Mount Suppliers routes
router.use("/users", usersController); // Mount Users routes

// ----------------------------------------------------------
// API endpoints
// system level health check.
router.get("/check-db-connection", async (req, res) => {
  const isConnect = await appService.testOracleConnection();
  if (isConnect) {
    res.send("connected");
  } else {
    res.send("unable to connect");
  }
});

module.exports = router;
