const { Schema, model, Types } = require('mongoose');
const { format } = require('date-fns');

// Schema for reactions (reactions are basically comments on thoughts)
const ReactionSchema = new Schema({
    // An ID is generated through mongoose
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    // The text content of the reaction - is required and cannot be longer than 280 characters
    reactionBody: {
        type: String,
        required: 'reactionBody is required!',
        maxlength: [280, 'reactionBody must be at most 280 character in length!']
    },
    // Username of the reaction owner - is required
    username: {
        type: String,
        required: 'username is required!'
    },
    // Timestamp of the reaction creation
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format(createdAtVal, 'MMM d, yyyy, hh:mm')
    }
},
    {
        toJSON: {
            // Use getters, specifically for displaying the createdAt property
            getters: true
        },
        _id: false,
        id: false
    });

const ThoughtSchema = new Schema({
    // Thoughts are required and must be between 1 and 280 characters in length
    thoughtText: {
        type: String,
        required: 'thoughtText is required!',
        minLength: [1, 'thoughtText must be at least 1 character in length!'],
        maxLength: [280, 'thoughtText must be at most 280 character in length!']
    },
    // Timestamp of the thought creation
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format(createdAtVal, 'MMM d, yyyy, hh:mm')
    },
    // Username of the thought owner - is required
    username: {
        type: String,
        required: 'username is required!'
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            // Use virtuals, specifically to tally the number of Reactions for any given Thought
            virtuals: true,
            // Use getters, specifically for displaying the createdAt property
            getters: true
        },
        id: false
    });

// Adds a virtual to tally the number of Reactions for any given Thought
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Uses the Schema for Thoughts to create a Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;