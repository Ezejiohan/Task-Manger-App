const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'must provide a fullname'],
        trim: true,
        maxlength: [25,'fullname must not be more than 25 characters' ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be 7 characters long and include at least one uppercase and one special character']
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;