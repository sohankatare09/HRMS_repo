const expensesModel = require("../models/expensesModel")
const status=require("../config/status")

exports.addExpenses = async (req, res) => {
    try {
        let ExpensesExists = await expensesModel.findOne({ expenses_bill: req.body.expenses_bill }).lean().exec();
        if (ExpensesExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'expenses already registered.' });
        }

        var obj = {
            expenses_purpose: req.body.expenses_purpose,
            expenses_bill: req.body.expenses_bill,
            expenses_amount: req.body.expenses_amount,
            expenses_voucher: req.body.expenses_voucher,
            expenses_remark: req.body.expenses_remark,
            expenses_by_cash: req.body.expenses_cash,
            expenses_by_cheque: req.body.expenses_cheque,
            expenses_cash_recieved_by: req.body.expenses_cash_recieved_by
             
        }
        const newexpensesModel = new expensesModel(obj);
        let result = await newexpensesModel.save();
        res.json({ success: true, status: status.OK, msg: 'New expenses add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save expensess failed.' });

    }
}

exports.getExpenses = async (req, res) => {
    try {
        const data = await expensesModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get expenses failed.' });

    }
}

exports.updateExpenses = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await expensesModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    expenses_purpose: req.body.expenses_purpose,
                    expenses_bill: req.body.expenses_bill,
                    expenses_amount: req.body.expenses_amount,
                    expenses_voucher: req.body.expenses_voucher,
                    expenses_remark: req.body.expenses_remark,
                    expenses_by_cash: req.body.expenses_cash,
                    expenses_by_cheque: req.body.expenses_cheque,
                    expenses_cash_recieved_by: req.body.expenses_cash_recieved_by
                     
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expenses is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expenses Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update expenses failed.' });

    }
}

exports.deleteExpenses = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await expensesModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expenses is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expenses Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Expenses data failed.' });

    }
}

exports.getExpensesbyid = async (req, res) => {
    try {
        let expensesid = req.query.expensesid;
        // const ID = req.query.expensesid;
        if (expensesid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await expensesModel.findOne({ _id: expensesid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get expenses failed.' });
    }

}

exports.getExpensesbyids = async (req, res) => {
    try {
        let expensesIdList = req.query.expensesid; // Expecting this to be an array of expenses IDs

        if (!expensesIdList) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }

        // Ensure `userIdList` is an array for the `find` query
        if (!Array.isArray(expensesIdList)) {
            expensesIdList = [expensesIdList];
        }

        const data = await expensesModel.find({ _id: { $in: expensesIdList } }).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get expensess failed.' });
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
        let result = await expensesModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'expenses data deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete expenses data  failed. No matching students found for the given IDs.' });
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
                { expenses_purpose: { $regex: new RegExp(query, "i") } },
                { expenses_bill: { $regex: new RegExp(query, "i") } },
                { expenses_amount: { $regex: new RegExp(query, "i") } },
                { expenses_voucher: { $regex: new RegExp(query, "i") } }

            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { expenses_first_name: { $regex: new RegExp(firstName, "i") } },
                    { expenses_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await expensesModel.find(searchQuery);

        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}