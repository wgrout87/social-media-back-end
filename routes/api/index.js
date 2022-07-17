const router = require('express').Router();
const userRoutes = require('./user-routes');

// Adds '/users' prefix to the routes created in 'user-routes.js'
router.use('/users', userRoutes);

module.exports = router;