const express = require("express");
const appService = require("./appService");
// ------------------------step 1: import sub appControllers---------
const locationsController = require('./appControllers/LocationsAppController'); // Import the Locations controller
const batchesController = require('./appControllers/BatchesAppController'); // Import the Batches controller
const plantsController = require('./appControllers/PlantsAppController'); // Import the plants controller
const tagsController = require('./appControllers/TagsAppController'); // Import the Tags controller
const ordersController = require('./appControllers/OrdersAppController'); // Import the Tags controller
const orderItemsController = require('./appControllers/OrderItemsAppController'); // Import the Tags controller
const stagesController = require('./appControllers/StagesAppController');
const soilConditionsController = require('./appControllers/SoilConditionsAppController'); 
const distinguishedByAppController = require('./appControllers/DistinguishedByAppController'); 
const cultivarsByAppController = require('./appControllers/CultivarsAppController'); 
const suppliersController = require("./appControllers/SuppliersAppController"); // Import the Suppliers controller
const usersController = require("./appControllers/UsersAppController"); // Import the Users controller
const recordsController = require("./appControllers/RecordsAppController"); // Import the Records controller
const batchIsAtStageController = require("./appControllers/BatchIsAtStageAppController"); // Import the BatchIsAtStage controller

//------------------step 2: load routers below -----------------------
const router = express.Router();

router.use('/locations',locationsController) // Mount Locations routes
router.use('/batches',batchesController) // Mount Batches routes
router.use('/plants',plantsController) // Mount plants routes
router.use('/tags', tagsController) // Mount tags routes
router.use('/orders', ordersController)
router.use('/order-items', orderItemsController)
router.use('/stages', stagesController)
router.use('/soilconditions',soilConditionsController) // Mount Soil routes
router.use('/locdistinguishedbysoil',distinguishedByAppController) 
router.use('/cultivars',cultivarsByAppController) 
router.use("/suppliers", suppliersController); // Mount Suppliers routes
router.use("/users", usersController); // Mount Users routes
router.use("/records", recordsController); // Mount Records routes
router.use("/batchIsAtStage", batchIsAtStageController); // Mount BatchIsAtStage routes
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

// TODO: add the system level sql load.


module.exports = router;
