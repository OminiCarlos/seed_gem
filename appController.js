const express = require('express');
const appService = require('./appService'); 
// ------------------------step 1: import sub appControllers---------
const locationsController = require('./appControllers/LocationsAppController'); // Import the Locations controller
const batchesController = require('./appControllers/BatchesAppController'); // Import the Batches controller
console.log("REACHED HERE")
const soilConditionsController = require('./appControllers/SoilConditionsAppController'); 
const distinguishedByAppController = require('./appControllers/DistinguishedByAppController'); 

//------------------step 2: load routers below -----------------------
const router = express.Router();

router.use('/locations',locationsController) // Mount Locations routes
router.use('/batches',batchesController) // Mount Batches routes
router.use('/soilconditions',soilConditionsController) // Mount Soil routes
router.use('/locdistinguishedbysoil',distinguishedByAppController) 

// ----------------------------------------------------------
// API endpoints
// system level health check.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// TODO: add the system level sql load.


module.exports = router;