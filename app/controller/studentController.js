const studentModel = require("../models/studentModel")
const status=require("../config/status")

exports.addStudent = async (req, res) => {
    try {
        let UserExists = await studentModel.findOne({ email: req.body.email }).lean().exec();
        if (UserExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
        }

        var obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            phone_no: req.body.phone_no,
             
         }
        const newuserModel = new studentModel(obj);
        let result = await newuserModel.save();
        res.json({ success: true, status: status.OK, msg: 'New Student add  successfully.' });

    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Student failed.' });

    }
}

exports.getStudent = async (req, res) => {
    try {
        const data = await studentModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Users failed.' });

    }
}

exports.updateStudent = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    // delete req.query.id;
    try {
        let result = await studentModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                   name: req.body.name,
                    phone_no: req.body.phone_no,
                    email: req.body.email,
                    password: req.body.password,
                    dob: req.body.dob
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Student is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Student Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Student failed.' });

    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await studentModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Student is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Student Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Student data failed.' });

    }
}

exports.getStudentbyid = async (req, res) => {
    try {
        let studentid = req.query.studentid;
        // const ID = req.query.studentid;
        if (studentid === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await studentModel.findOne({ _id: studentid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get student failed.' });
    }

}

exports.getStudentbyids = async (req, res) => {
    try {
        let studentIdList = req.query.studentid; // Expecting this to be an array of student IDs

        if (!studentIdList) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }

        // Ensure `userIdList` is an array for the `find` query
        if (!Array.isArray(studentIdList)) {
            studentIdList = [studentIdList];
        }

        const data = await studentModel.find({ _id: { $in: studentIdList } }).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get students failed.' });
    }
};
