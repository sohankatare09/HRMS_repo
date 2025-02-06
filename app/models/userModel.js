const mongoose = require('mongoose');
 // var connection = require('../config/mongo-connection');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
   
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'

    },
    phone: { type: String },


},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const UserData = mongoose.model('user', UserSchema);

module.exports = UserData;
