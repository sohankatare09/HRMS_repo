const mongoose = require('mongoose');
 
const ConsultancySchema = mongoose.Schema({
    consultancy_name: {
    type: String,
    required: true
},
consultancy_mobile: {
    type: String,
    required: true
},
consultancy_alternate_mobile: {
    type: String,
 },
consultancy_email: {
    type: String,
    required: true,
    unique: true
},
consultancy_website: {
    type: String,
 },
 consultancy_city: {
    type: String,
 },
 consultancy_state: {
    type: String,
 },
 consultancy_address: {
    type: String,
 },
 consultancy_details: {
    type: String,
 },
},

{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const ConsultancyData = mongoose.model('consultancy', ConsultancySchema);

module.exports = ConsultancyData;
