const mongoose = require('mongoose');
 
const EmployeeSchema = mongoose.Schema({
employee_first_name: {
    type: String,
    required: true
},
employee_last_name: {
    type: String,
    required: true
},
employee_mobile: {
    type: String,
    required: true
},
employee_alternate_mobile: {
    type: String,
 },
 employee_email: {
    type: String,
    required: true,
    unique: true
},
employee_password: {
    type: String,
    required: true
},
employee_address: {
    type: String,
 },
employee_city: {
    type: String,
 },
employee_state: {
    type: String,
 },
employee_other_info: {
    type: String,
 },
employee_dob: {
    type: Date,
    default: Date.now
},
employee_skills: {
    type: String,
 },
employee_experience: {
    type: String,
    required: true
},
employee_resume: {
    type: String,
 },
employee_id_proof: {
    type: String,
 },
employee_permanant_address_proof: {
    type: String,
 },
employee_local_address_proof: {
    type: String,
 },
employee_reference_one_name: {
    type: String,
 },
employee_reference_one_mobile: {
    type: String,
 },
employee_reference_two_name: {
    type: String,
 },
employee_reference_two_mobile: {
    type: String,
 },
},

{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const EmployeeData = mongoose.model('employee', EmployeeSchema);

module.exports = EmployeeData;
