const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            // Shows the reaction entries rather than just their ID
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            // Removes __v property from the returned data
            .select('-__v')
            // Sorts in descending order
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get a single thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            // Shows the reaction entries rather than just their ID
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            // Removes __v property from the returned data
            .select('-__v')
            .then(dbThoughtData => {
                // Checks to see if no thought was found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create a thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                // Checks to see if no thought was found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                // Checks to see if no thought was found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then((dbThoughtData) => {
                // Checks to see if no thought was found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
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

    // Create a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // Delete a reaction to a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbthoughtData => {
                // Checks to see if no user was found
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }

                res.json(dbthoughtData)
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;