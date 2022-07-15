const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts
router.use('/')
    .get(getThoughts)
    .post(createThought);

// api/thoughts/:thoughtId
router.use('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.use('/:thoughtId/reactions')
    .post(postReaction)
    .delete(deleteReaction);

module.exports = router;
