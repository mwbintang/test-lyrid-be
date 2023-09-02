const express = require("express");
const router = express.Router();
const employeeManagement = require("./employee_management");
const userManagement = require("./user_management");
const controller = require('../controllers/login')

router.use("/employeeManagement", employeeManagement);
router.use("/userManagement", userManagement);
router.post('/login', controller.login)
router.post('/upload', controller.upload);
router.get('/image/:filename', controller.getImage)

module.exports = router;