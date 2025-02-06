const express = require("express");
const userRoute = require("../routes/userRoute")
const studentRoute = require("../routes/studentRoute")
const employeeRoute = require("../routes/employeeRoute")
const candidateRoute = require("../routes/candidateRoute")
const consultancyRoute = require("../routes/consultancyRoute")
const expenses = require("../routes/expensesRoute")
const helpcenter = require("../routes/helpcenterRoute")

const router = express.Router();
router.use("/user",userRoute)
 router.use("/student",studentRoute)
 router.use("/employee",employeeRoute)
 router.use("/candidate",candidateRoute)
 router.use("/consultancy",consultancyRoute)
 router.use("/expenses",expenses)
 router.use("/helpcenter",helpcenter)

module.exports = router;


