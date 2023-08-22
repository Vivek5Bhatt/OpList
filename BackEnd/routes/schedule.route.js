const Express = require("express")
const Router = Express.Router()
const Validate = require('../middleware/validate.middleware')
const { GetStatusScheduleSchema, CreateScheduleSchema } = require('../validations/schedule.validation')
const Schedule = require('../controllers/schedule.controller')

Router.post('/create', Validate(CreateScheduleSchema), Schedule.CreateSchedule)
Router.post('/status', Validate(GetStatusScheduleSchema), Schedule.ScheduleStatus)

module.exports = Router

