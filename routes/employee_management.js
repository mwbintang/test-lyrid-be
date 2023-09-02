const express = require('express')
const router = express.Router()
const controller = require('../controllers/employee_management')
const isAuth = require('../middlewares/auth')

router.get('/', isAuth, controller.getData)
router.get('/:id', isAuth, controller.dataById)
router.post('/create', controller.create)
router.put('/edit/:id', isAuth, controller.edit)
router.delete('/delete/:id', isAuth, controller.delete)

module.exports = router;