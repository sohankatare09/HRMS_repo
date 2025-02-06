const expensesController = require("../controller/expensesController");
const express = require("express");
const router = express.Router();
router.route('/create_expenses' ).post(expensesController.addExpenses);
router.route('/get_expenses' ).get(expensesController.getExpenses);
router.route('/update_expenses' ).put(expensesController.updateExpenses);
router.route('/delete_expenses').delete(expensesController.deleteExpenses)
router.route('/get').get(expensesController.getExpensesbyid)
router.route('/get_data').get(expensesController.getExpensesbyids)
router.route('/multi_delete').delete(expensesController.multidelete)
router.route('/get_search').get(expensesController.search)
module.exports=router