const router = require('express').Router();
const apiRoutes = require('./api');

// Adds '/api' prefix to the api routes 
router.use('/api', apiRoutes);

module.exports = router;