const { User, Thought } = require('../models');

module.exports = {
    // GET all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.status(200).json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // GET a single Thought
    getSingleThought(req, res) {
        Thought.findOne({
            _id:req.params.thoughtId
        })
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this ID!'})
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err)); 
    },
    // POST a new Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id:req.params.userId },
                    { $addToSet: { thoughtText: thought._id  } },
                    { new: true},
                    (err, result) => {
                        if (result) {
                            console.log(`Thought updated in ${req.body.userId}.`)
                        }
                        else {
                            console.log('Something failed!')
                        }
                    })
                res.json(thought)
            })   
            .catch((err) => res.status(500).json(err));
    },
    // UPDATE a Thought with certain thoughtId (come back to this)
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought 
                    ? res.status(404).json({ message: 'No thought found with this ID!' })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a Thought with certain thoughtId 
    deleteThought(req, res) {
        Thought.findOneAndRemove({
            _id: req.params.thoughtId
        })
            .then((thought) => res.json(thought))
            .catch((err) => res.json(err));
    },

    // POST reaction to a thought
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { 'reactions': req.body } },
            { new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE reactions from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID!' })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};