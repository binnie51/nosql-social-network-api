// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    // GET all Users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                res.json(users)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // GET a single User
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId
        })
            .select('-__v')
            .lean()
            .then(async (user) => 
                !user
                    ? res.status(400).json({ message: 'No user found with such ID!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // POST (create) a new User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // PUT (update) user with particular userId
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user found with such ID!' })
                : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a user with particular userId and remove all their thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({
            _id: req.params.userId
        })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with such ID!'})
                    : Thought.deleteMany(
                        { username: user.username }
                    )
            )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'User deleted, but NO thoughts found!' })
                    : res.json({ message: 'User deleted!' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    // Add a friend to a User
    addFriend(req, res) {
        console.log('Friend added!');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId  },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with such ID!' })
                    : res.stutus(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE (remove) User's friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with such ID!' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    }, 
};
