const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Adds '/users' prefix to the routes created in 'user-routes.js'
router.use('/users', userRoutes);
// Adds '/thoughts' prefix to the routes created in 'thought-routes.js'
router.use('/thoughts', thoughtRoutes);

module.exports = router;