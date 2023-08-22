const Express = require("express")
const Router = Express.Router()
const { verifyToken } = require('../middleware/jwt.middleware')
const Validate = require('../middleware/validate.middleware')
const { PersonnelSchema, UpdatePersonnelSchema } = require('../validations/personnel.validation')
const Personnel = require('../controllers/personnel.controller')

Router.post('/add', Validate(PersonnelSchema), verifyToken, Personnel.AddPersonnel)
Router.put('/update', Validate(UpdatePersonnelSchema), verifyToken, Personnel.UpdatePersonnel)
Router.get('/detail', verifyToken, Personnel.PersonnelDetail)

module.exports = Router

