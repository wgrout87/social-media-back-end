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
        required: 'Your reaction must have body text!',
        maxlength: [280, 'Your reaction cannot be longer than 280 characters!']
    },
    // Username of the reaction owner - is required
    username: {
        type: String,
        required: 'A username is required!'
    },
    // Timestamp of the reaction creation
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format(createdAtVal, 'MMM d, yyyy')
    }
},
    {
        toJSON: {
            // Use getters, specifically for displaying the createdAt property
            getters: true
        }
    })