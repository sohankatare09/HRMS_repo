const mongoose = require('mongoose');
 
const CandidateSchema = mongoose.Schema({
candidate_first_name: {
    type: String,
    required: true
},
candidate_last_name: {
    type: String,
    required: true
},
candidate_mobile: {
    type: String,
    required: true
},
candidate_alternate_mobile: {
    type: String,
 },
 candidate_email: {
    type: String,
    required: true,
    unique: true
},
candidate_skype: {
    type: String,
    required: true
},
candidate_profile: {
    type: String,
 },
candidate_skills: {
    type: String,
 },
candidate_experience: {
    type: String,
    required: true
},
candidate_expected_salary: {
    type: String,
 },
candidate_expected_joining_date: {
    type: String,
 },
candidate_joining_immediate: {
    type: String,
 },
candidate_marrital_status: {
    type: String,
 },
candidate_written_round: {
    type: String,
 },
candidate_machine_round: {
    type: String,
 },
candidate_technical_interview_round: {
    type: String,
 },
candidate_selection_status: {
    type: String,
 },
candidate_feedback:{
    type: String,
},
candidate_from_consultancy:{
    type:String,
},
},

{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
const CandidateData = mongoose.model('candidate', CandidateSchema);

module.exports = CandidateData;
