const mongoose = require('mongoose');
 
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
    },
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
   

},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const StudentData = mongoose.model('student', StudentSchema);

module.exports = StudentData;
