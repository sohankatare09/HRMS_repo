const helpcenterController = require("../controller/helpcenterController");
const express = require("express");
const router = express.Router();
router.route('/create_helpcenter' ).post(helpcenterController.addHelpCenter);
router.route('/get_helpcenter' ).get(helpcenterController.getHelpCenter);
router.route('/update_helpcenter' ).put(helpcenterController.updateHelpCenter);
router.route('/delete_helpcenter').delete(helpcenterController.deleteHelpCenter)
router.route('/get').get(helpcenterController.getHelpCenterbyid)
router.route('/get_data').get(helpcenterController.getHelpCenterbyids)
router.route('/multi_delete').delete(helpcenterController.multidelete)
router.route('/get_search').get(helpcenterController.search)
module.exports=router