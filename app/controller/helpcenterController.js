const helpcenterModel = require("../models/helpcenterModel")
const status=require("../config/status")

exports.addHelpCenter = async (req, res) => {
    console.log("sohanahfs")
    try {
        console.log("sohan")

        let HelpCenterExists = await helpcenterModel.findOne({ helpcenter_employee_id: req.body.helpcenter_employee_id }).lean().exec();
        if (HelpCenterExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'helpcenter already registered.' });
        }

        var obj = {
            helpcenter_ticket_id: req.body.helpcenter_ticket_id,
            helpcenter_employee_id: req.body.helpcenter_employee_id,
            helpcenter_ticket_description: req.body.helpcenter_ticket_description,
            helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
            helpcenter_ticket_department: req.body.helpcenter_ticket_department,
            helpcenter_ticket_created_date: req.body.helpcenter_ticket_created_date,
            helpcenter_ticket_status: req.body.helpcenter_ticket_status,
            helpcenter_ticket_solved_date: req.body.helpcenter_ticket_solved_date,
            helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
            helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
            helpcenter_ticket1: req.body.helpcenter_ticket1
             
        }
        const newhelpcenterModel = new helpcenterModel(obj);
        let result = await newhelpcenterModel.save();
        console.log("result",result)
        res.json({ success: true, status: status.OK, msg: 'New helpcenter add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save helpcenters failed.' });

    }
}

exports.getHelpCenter = async (req, res) => {
    try {
        const data = await helpcenterModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get helpcenter failed.' });

    }
}

exports.updateHelpCenter = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await helpcenterModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    helpcenter_ticket_id: req.body.helpcenter_ticket_id,
            helpcenter_employee_id: req.body.helpcenter_employee_id,
            helpcenter_ticket_description: req.body.helpcenter_ticket_description,
            helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
            helpcenter_ticket_department: req.body.helpcenter_ticket_department,
            helpcenter_ticket_created_date: req.body.helpcenter_ticket_created_date,
            helpcenter_ticket_status: req.body.helpcenter_ticket_status,
            helpcenter_ticket_solved_date: req.body.helpcenter_ticket_solved_date,
            helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
            helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
            helpcenter_ticket1: req.body.helpcenter_ticket1
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'helpcenter is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'helpcenter Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update helpcenter failed.' });

    }
}

exports.deleteHelpCenter = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await helpcenterModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'helpcenter is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'helpcenter Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete helpcenter data failed.' });

    }
}

exports.getHelpCenterbyid = async (req, res) => {
    try {
        let helpcenterid = req.query.helpcenterid;
        // const ID = req.query.helpcenterid;
        if (helpcenterid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await helpcenterModel.findOne({ _id: helpcenterid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get helpcenter failed.' });
    }

}

exports.getHelpCenterbyids = async (req, res) => {
    try {
        let helpcenterIdList = req.query.helpcenterid; // Expecting this to be an array of helpcenter IDs

        if (!helpcenterIdList) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }

        // Ensure `userIdList` is an array for the `find` query
        if (!Array.isArray(helpcenterIdList)) {
            helpcenterIdList = [helpcenterIdList];
        }

        const data = await helpcenterModel.find({ _id: { $in: helpcenterIdList } }).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get helpcenters failed.' });
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
        let result = await helpcenterModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'helpcenter data deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete helpcenter data  failed. No matching students found for the given IDs.' });
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
                { helpcenter_purpose: { $regex: new RegExp(query, "i") } },
                { helpcenter_bill: { $regex: new RegExp(query, "i") } },
                { helpcenter_amount: { $regex: new RegExp(query, "i") } },
                { helpcenter_voucher: { $regex: new RegExp(query, "i") } }

            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { helpcenter_first_name: { $regex: new RegExp(firstName, "i") } },
                    { helpcenter_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await helpcenterModel.find(searchQuery);

        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}