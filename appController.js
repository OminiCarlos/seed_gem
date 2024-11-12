const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

// start adding new routes here!
router.get('/location-demotable', async (req, res) => {
    const tableContent = await appService.fetchLocationDemotableFromDb();
    res.json({data: tableContent});
});

// inititate table
router.post("/location-initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateLocationDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// insert one entry
router.post("/location-insert-demotable", async (req, res) => {
    // console.log("REACHED HERE:")
    // console.log(req.body);
    const {field_name, zone_id, is_outdoor, is_irrigated} = req.body;
    const insertResult = await appService.insertLocationDemotable(field_name, zone_id, is_outdoor?1:0, is_irrigated?1:0);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

//update one entry
router.post("/location-update-demotable", async (req, res) => {
    
    const { field_name, zone_id, is_outdoor } = req.body;
    const updateResult = await appService.updateLocationDemotable(field_name, zone_id, is_outdoor?1:0);
    console.log(updateResult);
    if (updateResult) {
        // console.log("REACHED here");
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});


//delete one entry
router.delete('/location-delete-demotable/:field_name/:zone_id', async(req, res) => {
    const {field_name, zone_id} = req.params;
    // console.log(field_name, zone_id);
    const deleteResult = await appService.deleteLocationDemotable(field_name, zone_id);
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});




module.exports = router;