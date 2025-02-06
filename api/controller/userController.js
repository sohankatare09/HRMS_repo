const userModel = require("../models/userModel")
const Employee= require("../models/employeeModel")
const status=require("../config/status")
exports.signup = async (req, res) => {
    try {
        let UserExists = await userModel.findOne({ email: req.body.email }).lean().exec();
        if (UserExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
        }

        var obj = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender,
            standard: req.body.standard,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            role: req.body.role,
        }
        const newuserModel = new userModel(obj);
        let result = await newuserModel.save();
        res.json({ success: true, status: status.OK, msg: 'New user add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });

    }
}

exports.getUsers = async (req, res) => {
    try {
        const data = await userModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Users failed.' });

    }
}




exports.updateUser = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await userModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    standard: req.body.standard,
                    address: req.body.address,
                    city: req.body.city,
                    role: req.body.role
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'User is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'User Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update User failed.' });

    }
}


exports.deleteUser = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await userModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'User is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'User Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete User data failed.' });

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
                { fname: { $regex: new RegExp(query, "i") } },
                { lname: { $regex: new RegExp(query, "i") } },
                { email: { $regex: new RegExp(query, "i") } },
                { mobile: { $regex: new RegExp(query, "i") } }

            ]
        };
        // Check if the query contains both first and last names
        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            // Update search query to match both first and last names together
            searchQuery.$or.push({
                $and: [
                    { user_first_name: { $regex: new RegExp(firstName, "i") } },
                    { user_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }
        // Perform search using Mongoose's find method
        const results = await userModel.find(searchQuery);

        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}

exports.login = async (req, res) => {
    console.log(",")
    try {
        var email = req.body && req.body.email ? req.body.email : '';
        var password = req.body && req.body.password ? req.body.password : '';
        var user = await userModel.findOne({ email: email }).select("email username password ").lean().exec();
        if (!user) {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
        } else {

            let ifPasswordMatch = await userModel.findOne({ password: password }).lean().exec();
            if (ifPasswordMatch) {

                var userResp = user;
                delete userResp.password;

                res.json({ success: true, msg: 'login successful', user: userResp });
            } else {
                res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
            }
        }
    } catch (e) {
        console.log("e", e)
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
    }
}

exports.getUserbyid = async (req, res) => {
    try {
        let userid = req.query.userid;
        // const ID = req.query.userid;
        if (userid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await userModel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get user failed.' });
    }

}

exports.changePassword = async (req, res) => {
    console.log("req.body----", req.body)
    try {
        const email = req.body.email;
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword; // New field for confirmation password
        // Find the user in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: 'User not found.' });
        }
        // Verify current password
        if (currentPassword !== user.password) {
            return res.json({ success: false, msg: 'Invalid current password.' });
        }
        if (newPassword !== confirmPassword) {
            return res.json({ success: false, msg: 'New password and confirmation password do not match.' });
        }
        await userModel.updateOne({ email }, { password: newPassword });
        return res.json({ success: true, msg: 'Password changed successfully.' });
    } catch (e) {
        console.error("Error in change password:", e);
        return res.json({ success: false, err: e, msg: 'Error in change password.' });
    }
};

