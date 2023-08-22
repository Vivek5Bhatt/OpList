const Express = require("express")
const Router = Express.Router()
const { verifyToken } = require('../middleware/jwt.middleware')
const Validate = require('../middleware/validate.middleware')
const { SignUpSchema, LoginSchema, SendEmailSchema, UpdateProfile } = require('../validations/user.validation')
const User = require('../controllers/user.controller')

Router.post('/signup', Validate(SignUpSchema), User.SignUp)
Router.post('/login', Validate(LoginSchema), User.Login)
Router.post('/gooleloginsignup', User.GoogleLoginSignUp)
Router.get('/getrefreshtoken/:userId', User.GetRefreshToken)
Router.get('/profile', verifyToken, User.Profile)
Router.put('/updateprofile', Validate(UpdateProfile), verifyToken, User.UpdateProfile)
Router.get('/msgsend/:phoneNumber', User.MsgSend)
Router.get('/emailsend', Validate(SendEmailSchema), User.EmailSend)
Router.put('/resetpassword', User.ResetPassword)
Router.put('/generatenewapikey', verifyToken, User.GenerateNewApiKey)

module.exports = Router

