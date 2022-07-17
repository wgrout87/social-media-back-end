const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'A username is required!',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'An email is required!',
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid e-mail address']
    }
});

const User = model('User', UserSchema);

module.exports = User;