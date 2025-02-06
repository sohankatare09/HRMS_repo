const studentController = require("../controller/studentController");
const express = require("express");
const router = express.Router();
router.route('/create_student' ).post(studentController.addStudent);
router.route('/get_student' ).get(studentController.getStudent);
router.route('/update_student' ).put(studentController.updateStudent);
router.route('/delete_student').delete(studentController.deleteStudent)
router.route('/get').get(studentController.getStudentbyid)
router.route('/get_data').get(studentController.getStudentbyids)

module.exports=router;