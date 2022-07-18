const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// GET at /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// GET one, POST, and PUT at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought);

// DELETE at /api/thoughts/:thoughtId/:userId
router
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

// POST at /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;