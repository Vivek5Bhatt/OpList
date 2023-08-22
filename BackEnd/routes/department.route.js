const Express = require("express")
const Router = Express.Router()
const { verifyToken } = require('../middleware/jwt.middleware')
const Validate = require('../middleware/validate.middleware')
const { DepartmentSchema, UpdateDepartmentSchema } = require('../validations/department.validation')
const Department = require('../controllers/department.controller')

Router.post('/add', Validate(DepartmentSchema), verifyToken, Department.AddDepartment)
Router.put('/update', Validate(UpdateDepartmentSchema), verifyToken, Department.UpdateDepartment)
Router.get('/detail', verifyToken, Department.DepartmentDetail)

module.exports = Router

