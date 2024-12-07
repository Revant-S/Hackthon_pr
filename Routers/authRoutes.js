const { Router } = require("express")

const authControllers = require("../Controllers/authControllers.js")

const router = Router()

//Signup For DepartmentPerson
router.post("/deptsignup",authControllers.deptsignup)
//Signup For Public
router.post("/publicSignup",authControllers.publicsignup)
router.post("/publiclogin",authControllers.publiclogin)
router.post("/deptlogin",authControllers.deptlogin)

module.exports = router
