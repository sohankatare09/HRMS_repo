const candidateModel = require("../models/candidateModel")
const status=require("../config/status")

exports.addCandidate = async (req, res) => {
    try {
        let CandidateExists = await candidateModel.findOne({ candidate_email: req.body.candidate_email }).lean().exec();
        if (CandidateExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'candidate already registered.' });
        }

        var obj = {
            candidate_first_name: req.body.candidate_first_name,
            candidate_last_name: req.body.candidate_last_name,
            candidate_mobile: req.body.candidate_mobile,
            candidate_alternate_mobile: req.body.candidate_alternate_mobile,
            candidate_email: req.body.candidate_email,
            candidate_skype: req.body.candidate_skype,
            candidate_profile: req.body.candidate_profile,
            candidate_skills: req.body.candidate_skills,
            candidate_experience: req.body.candidate_experience,
            candidate_expected_salary: req.body.candidate_expected_salary,
            candidate_expected_joining_date: req.body.candidate_expected_joining_date,
            candidate_joining_immediate: req.body.candidate_joining_immediate,
            candidate_marrital_status: req.body.candidate_marrital_status,
            candidate_written_round: req.body.candidate_written_round,
            candidate_machine_round: req.body.candidate_machine_round,
            candidate_selection_status: req.body.candidate_selection_status,
            candidate_feedback: req.body.candidate_feedback,
            candidate_from_consultancy: req.body.candidate_from_consultancy
        }
        const newcandidateModel = new candidateModel(obj);
        let result = await newcandidateModel.save();
        res.json({ success: true, status: status.OK, msg: 'New candidate add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save candidates failed.' });

    }
}

exports.getCandidate = async (req, res) => {
    try {
        const data = await candidateModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Candidate failed.' });

    }
}

exports.updateCandidate = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await candidateModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    candidate_first_name: req.body.candidate_first_name,
            candidate_last_name: req.body.candidate_last_name,
            candidate_mobile: req.body.candidate_mobile,
            candidate_alternate_mobile: req.body.candidate_alternate_mobile,
            candidate_email: req.body.candidate_email,
            candidate_skype: req.body.candidate_skype,
            candidate_profile: req.body.candidate_profile,
            candidate_skills: req.body.candidate_skills,
            candidate_experience: req.body.candidate_experience,
            candidate_expected_salary: req.body.candidate_expected_salary,
            candidate_expected_joining_date: req.body.candidate_expected_joining_date,
            candidate_joining_immediate: req.body.candidate_joining_immediate,
            candidate_marrital_status: req.body.candidate_marrital_status,
            candidate_written_round: req.body.candidate_written_round,
            candidate_machine_round: req.body.candidate_machine_round,
            candidate_selection_status: req.body.candidate_selection_status,
            candidate_feedback: req.body.candidate_feedback,
            candidate_from_consultancy: req.body.candidate_from_consultancy
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Candidate Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Candidate failed.' });

    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await candidateModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Candidate Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Candidate data failed.' });

    }
}

exports.getCandidatebyid = async (req, res) => {
    try {
        let candidateid = req.query.candidateid;
        // const ID = req.query.candidateid;
        if (candidateid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await candidateModel.findOne({ _id: candidateid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidate failed.' });
    }

}

exports.getCandidatebyids = async (req, res) => {
    try {
        let candidateIdList = req.query.candidateid; // Expecting this to be an array of candidate IDs

        if (!candidateIdList) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }

        // Ensure `userIdList` is an array for the `find` query
        if (!Array.isArray(candidateIdList)) {
            candidateIdList = [candidateIdList];
        }

        const data = await candidateModel.find({ _id: { $in: candidateIdList } }).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidates failed.' });
    }
};

exports.multidelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await candidateModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Candidate data deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Candidate data  failed. No matching students found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}

exports.search = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const searchQuery = {
            $or: [
                { candidate_first_name: { $regex: new RegExp(query, "i") } },
                { candidate_last_name: { $regex: new RegExp(query, "i") } },
                { candidate_email: { $regex: new RegExp(query, "i") } },
                { candidate_mobile: { $regex: new RegExp(query, "i") } }

            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
                    { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await candidateModel.find(searchQuery);

        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}