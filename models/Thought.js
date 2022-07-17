const { Schema, model, Types } = require('mongoose');
const { format } = require('date-fns');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Your reaction must have body text!',
        maxlength: [280, 'Your reaction cannot be longer than 280 characters!']
    },
    username: {
        type: String,
        required: 'A username is required!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => format(createdAtVal, 'MMM d, yyyy')
    }
},
    {
        toJSON: {
            getters: true
        }
    })