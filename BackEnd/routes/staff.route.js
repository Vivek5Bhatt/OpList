const Express = require("express")
const Router = Express.Router()
const { verifyToken } = require('../middleware/jwt.middleware')
const Validate = require('../middleware/validate.middleware')
const { StaffSchema, UpdateStaffSchema } = require('../validations/staff.validation')
const Staff = require('../controllers/staff.controller')

Router.post('/add', Validate(StaffSchema), verifyToken, Staff.AddStaff)
Router.put('/update', Validate(UpdateStaffSchema), verifyToken, Staff.UpdateStaff)
Router.get('/list', verifyToken, Staff.StaffList)

module.exports = Router