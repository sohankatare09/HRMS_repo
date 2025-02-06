const employeeController = require("../controller/employeeController");
const express = require("express");
const router = express.Router();
router.route('/create_employee' ).post(employeeController.addEmployee);
router.route('/get_employee' ).get(employeeController.getEmployee);
router.route('/update_employee' ).put(employeeController.updateEmployee);
router.route('/delete_employee' ).delete(employeeController.deleteEmployee);
router.route('/get').get(employeeController.getEmployeebyid)
router.route('/multi_delete').delete(employeeController.multidelete)

module.exports=router;
