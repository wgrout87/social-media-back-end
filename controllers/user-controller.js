const { User, Thought } = require('../models');

// A controller for handling interaction with the User model
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            // Shows the thought entries rather than just their ID
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // Shows the friend entries rather than just their ID
            .populate({
                path: 'friends',
                select: '-__v'
            })
            // Removes __v property from the returned data
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get a single user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // Shows the thought entries rather than just their ID
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // Shows the friend entries rather than just their ID
            .populate({
                path: 'friends',
                select: '-__v'
            })
            // Removes __v property from the returned data
            .select('-__v')
            .then(dbUserData => {
                // Checks to see if no user was found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }

                console.log(dbUserData.thoughts.length)
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    // Update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                // Checks to see if no user was found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // Checks to see if no user was found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }

                // Delete all of the User's thoughts
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(dbResponse => res.json({ message: `User deleted along with ${dbResponse.deletedCount} thoughts` }))
            .catch(err => res.status(400).json(err));
    },

    // Add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                // Checks to see if no user was found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Remove a friend when they are dead to you
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                // Checks to see if no user was found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;