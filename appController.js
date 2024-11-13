const express = require('express');
const appService = require('./appService'); 
const locationsController = require('./appControllers/LocationsAppController'); // Import the Locations controller

//------------------load routers below -----------------------
const router = express.Router();

router.use('/locations',locationsController) // Mount Locations routes

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

module.exports = router;