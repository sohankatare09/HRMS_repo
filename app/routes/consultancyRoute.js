const consultancyController = require("../controller/consultancyController");
const express = require("express");
const router = express.Router();
router.route('/create_consultancy' ).post(consultancyController.addConsultancy);
router.route('/get_consultancy' ).get(consultancyController.getConsultancy);
router.route('/update_consultancy' ).put(consultancyController.updateConsultancy);
router.route('/delete_consultancy').delete(consultancyController.deleteConsultancy)
router.route('/get').get(consultancyController.getConsultancybyid)
router.route('/get_data').get(consultancyController.getConsultancybyids)
router.route('/multi_delete').delete(consultancyController.multidelete)
router.route('/get_search').get(consultancyController.search)
module.exports=router