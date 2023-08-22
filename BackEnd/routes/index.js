const Express = require("express")
const Router = Express.Router()
const ScheduleRouter = require('./schedule.route')
const UserRouter = require('./user.route')
const DepartmentRouter = require('./department.route')
const PersonnelRouter = require('./personnel.route')
const StaffRouter = require('./staff.route')

Router.use('/schedules', ScheduleRouter)
Router.use('/users', UserRouter)
Router.use('/departments', DepartmentRouter)
Router.use('/personnels', PersonnelRouter)
Router.use('/staffs', StaffRouter)

module.exports = Router