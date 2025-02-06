const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();
router.route('/signup' ).post(userController.signup);
router.route('/login' ).post(userController.login);
router.route('/get_user' ).get(userController.getUsers);
router.route('/update_user').put(userController.updateUser)
router.route('/delete_user').delete(userController.deleteUser)
router.route('/get').get(userController.getUserbyid)
router.route('/get_search').get(userController.search)
router.route('/changepassword').put(userController.changePassword)
module.exports=router;