const consultancyModel = require("../models/consultancyModel")
const status=require("../config/status")

exports.addConsultancy = async (req, res) => {
    try {
        let ConsultancyExists = await consultancyModel.findOne({ consultancy_email: req.body.consultancy_email }).lean().exec();
        if (ConsultancyExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'consultancy already registered.' });
        }

        var obj = {
            consultancy_name: req.body.consultancy_name,
             consultancy_mobile: req.body.consultancy_mobile,
            consultancy_alternate_mobile: req.body.consultancy_alternate_mobile,
            consultancy_email: req.body.consultancy_email,
            consultancy_website:req.body.consultancy_website,
            consultancy_city:req.body.consultancy_city,
            consultancy_state:req.body.consultancy_state,
            consultancy_address:req.body.consultancy_address,
            consultancy_details:req.body.consultancy_details
        }
        const newconsultancyModel = new consultancyModel(obj);
        let result = await newconsultancyModel.save();
        res.json({ success: true, status: status.OK, msg: 'New consultancy add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save consultancys failed.' });

    }
}

exports.getConsultancy = async (req, res) => {
    try {
        const data = await consultancyModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Consultancy failed.' });

    }
}

exports.updateConsultancy = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await consultancyModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    consultancy_name: req.body.consultancy_name,
                    consultancy_mobile: req.body.consultancy_mobile,
                   consultancy_alternate_mobile: req.body.consultancy_alternate_mobile,
                   consultancy_email: req.body.consultancy_email,
                   consultancy_website:req.body.consultancy_website,
                   consultancy_city:req.body.consultancy_city,
                   consultancy_state:req.body.consultancy_state,
                   consultancy_address:req.body.consultancy_address,
                   consultancy_details:req.body.consultancy_details
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Consultancy Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Consultancy failed.' });

    }
}

exports.deleteConsultancy = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await consultancyModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Consultancy Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Consultancy data failed.' });

    }
}

exports.getConsultancybyid = async (req, res) => {
    try {
        let consultancyid = req.query.consultancyid;
        // const ID = req.query.consultancyid;
        if (consultancyid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await consultancyModel.findOne({ _id: consultancyid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get consultancy failed.' });
    }

}

exports.getConsultancybyids = async (req, res) => {
    try {
        let consultancyIdList = req.query.consultancyid; // Expecting this to be an array of consultancy IDs

        if (!consultancyIdList) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }

        // Ensure `userIdList` is an array for the `find` query
        if (!Array.isArray(consultancyIdList)) {
            consultancyIdList = [consultancyIdList];
        }

        const data = await consultancyModel.find({ _id: { $in: consultancyIdList } }).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get consultancys failed.' });
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
        let result = await consultancyModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy data deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Consultancy data  failed. No matching students found for the given IDs.' });
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
                { consultancy_first_name: { $regex: new RegExp(query, "i") } },
                { consultancy_last_name: { $regex: new RegExp(query, "i") } },
                { consultancy_email: { $regex: new RegExp(query, "i") } },
                { consultancy_mobile: { $regex: new RegExp(query, "i") } }

            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { consultancy_first_name: { $regex: new RegExp(firstName, "i") } },
                    { consultancy_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await consultancyModel.find(searchQuery);

        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}