const candidateController = require("../controller/candidateController");
const express = require("express");
const router = express.Router();
router.route('/create_candidate' ).post(candidateController.addCandidate);
router.route('/get_candidate' ).get(candidateController.getCandidate);
router.route('/update_candidate' ).put(candidateController.updateCandidate);
router.route('/delete_candidate').delete(candidateController.deleteCandidate)
router.route('/get').get(candidateController.getCandidatebyid)
router.route('/get_data').get(candidateController.getCandidatebyids)
router.route('/multi_delete').delete(candidateController.multidelete)
router.route('/get_search').get(candidateController.search)
module.exports=router