const { Schema, model, Types } = require('mongoose');

// Schema for Users
const UserSchema = new Schema({
    // Usernames must be unique, are required, and are trimmed
    username: {
        type: String,
        unique: true,
        required: 'A username is required!',
        trim: true
    },
    // Emails must be unique, are required, and are validated
    email: {
        type: String,
        unique: true,
        required: 'An email is required!',
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid e-mail address']
    },
    // An array of all thoughts created by the user
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // An array of all friends (other users) of the user
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            // Use virtuals, specifically to tally the number of friends for any given User
            virtuals: true,
        },
        id: false
    });

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Uses the Schema for Users to create a User model
const User = model('User', UserSchema);

module.exports = User;