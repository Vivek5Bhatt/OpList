const User = require('../models/user.model')
const JWT = require('../middleware/jwt.middleware')
const Bcrypt = require('bcrypt');
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { OAuth2Client } = require('google-auth-library');
const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.ENVIRONMENT === 'dev' ? process.env.LOCAL_BASE_URL : process.env.LIVE_BASE_URL
);
const jwtDecode = require('jwt-decode')

const SignUp = async (req, res) => {
    try {
        if (req.body.email) {
            const findData = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (findData) {
                const token = JWT.generateToken(findData.id)
                findData.dataValues['token'] = token
                const resp = {
                    success: true,
                    message: `User already exit this email.`,
                    findData
                }
                res.status(208).json(resp)
            } else {
                const randomFiveDigitNumber = Math.floor(Math.random() * 90000) + 10000;
                const randomApiKey = `${req.body.email.split("@")[0]}${randomFiveDigitNumber}`
                const dataToInsert = {
                    ...req.body,
                    password: Bcrypt.hashSync(req.body.password, 10),
                    api_key: Bcrypt.hashSync(randomApiKey, 10),
                }
                let data = await User.create(dataToInsert)
                if (data && data.id) {
                    const token = JWT.generateToken(data.id)
                    data.dataValues['token'] = token
                    data.dataValues['randomApiKey'] = randomApiKey
                }
                const resp = {
                    success: true,
                    message: 'User signup successfully',
                    data
                }
                res.status(200).json(resp)
            }
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const Login = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            })
        if (userExits) {
            const password = Bcrypt.compareSync(req.body.password, userExits.dataValues.password)
            if (password) {
                const token = JWT.generateToken(userExits.id)
                userExits.dataValues['token'] = token
                const resp = {
                    success: true,
                    message: 'User login successfully',
                    data: userExits
                }
                res.status(200).json(resp)
            } else {
                const resp = {
                    success: false,
                    error: {
                        message: 'Please enter correct password!'
                    }
                }
                res.status(404).json(resp)
            }
        } else {
            const resp = {
                success: false,
                error: {
                    message: 'User does not exist!'
                }
            }
            res.status(404).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const GoogleLoginSignUp = async (req, res) => {
    try {
        const jwtToken = await oAuth2Client.getToken(req.body.code);
        const userData = jwtDecode(jwtToken.tokens.id_token)
        const userExits = await User.findOne(
            {
                where: {
                    email: userData.email
                }
            })
        if (userExits) {
            const token = JWT.generateToken(userExits.id)
            userExits.dataValues['token'] = token
            const resp = {
                success: true,
                message: 'User login successfully',
                data: userExits
            }
            res.status(200).json(resp)
        } else {
            const randomFiveDigitNumber = Math.floor(Math.random() * 90000) + 10000;
            const randomApiKey = `${userData.email.split("@")[0]}${randomFiveDigitNumber}`
            const googleData = {
                email: userData.email,
                name: userData.name,
                api_key: Bcrypt.hashSync(randomApiKey, 10),
            }
            const createAccount = await User.create(googleData)
            const token = JWT.generateToken(createAccount.id)
            createAccount.dataValues['token'] = token
            createAccount.dataValues['randomApiKey'] = randomApiKey
            const resp = {
                success: true,
                message: 'User signup successfully!.',
                data: createAccount
            }
            res.status(200).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const GetRefreshToken = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    id: req.params.userId
                }
            })
        if (userExits) {
            const token = JWT.generateToken(userExits.id)
            if (token) {
                const resp = {
                    success: true,
                    token
                }
                res.status(200).json(resp)
            }
        }
    } catch (err) {
        const errorObj = {
            success: false,
            // error: err
        }
        res.status(500).json(errorObj)
    }
}

const Profile = async (req, res) => {
    try {
        const getUsers = await User.findOne({
            where: {
                id: req.userProfile.dataValues.id
            }
        })
        if (getUsers) {
            const resp = {
                success: true,
                message: 'Get user data successfully!',
                data: getUsers
            }
            res.status(200).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const UpdateProfile = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    id: req.userProfile.dataValues.id
                }
            })
        if (userExits && userExits.dataValues) {
            const updateData = {
                ...userExits.dataValues,
                ...req.body
            }
            const updatedData = await User.update(
                updateData,
                { where: { id: req.userProfile.dataValues.id } }
            )
            if (updatedData) {
                const resp = {
                    success: true,
                    message: 'User profile updated successfully!',
                    data: updateData
                }
                res.status(200).json(resp)
            }
        } else {
            const resp = {
                success: false,
                error: {
                    message: 'User does not exist!'
                }
            }
            res.status(404).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const MsgSend = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    phone_number: req.params.phoneNumber
                }
            })
        if (userExits) {
            const msgResponse = await client.messages.create({
                body: 'User signup successfully',
                from: process.env.TWILIO_FROM_NUMBER,
                to: `+${req.params.phoneNumber}`
            })
            if (msgResponse && msgResponse.accountSid) {
                const resp = {
                    success: true,
                    message: 'Msg send successfully!',
                    data: msgResponse
                }
                res.status(200).json(resp)
            }
        } else {
            const resp = {
                success: false,
            }
            res.status(404).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const EmailSend = async (req, res) => {
    try {
        let resetPasswordUrl
        if (process.env.ENVIRONMENT === 'dev') {
            resetPasswordUrl = `${process.env.LOCAL_BASE_URL}/reset-password/${req.query.email}`
        } else {
            resetPasswordUrl = `${process.env.LIVE_BASE_URL}/reset-password/${req.query.email}`
        }
        const userExits = await User.findOne(
            {
                where: {
                    email: req.query.email
                }
            })
        if (userExits) {
            const msg = {
                to: req.query.email,
                from: process.env.SENDGRID_FROM_EMAIL,
                subject: `${req.query.type === 'signup' ? 'User Signup' : 'Reset Op List Password'}`,
                html: `${req.query.type === 'signup' ? 'User Signup Successfully' : `<strong>Please reset your password in this link</strong> <a href=${resetPasswordUrl}>Click here</a>`}`,
            };
            const sendEmail = await sgMail.send(msg);
            const resp = {
                success: true,
                message: 'Email send successfully!',
                data: sendEmail
            }
            res.status(200).json(resp)
        } else {
            const resp = {
                success: false,
                error: {
                    message: `The email address you've entered doesnot exist`
                }
            }
            res.status(404).json(resp)
        }
    } catch (error) {
        if (error.response) {
            const errorObj = {
                success: false,
                message: 'Something went wrong',
                error: error.response.body
            }
            res.status(500).json(errorObj)
        }

    }
}

const ResetPassword = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            })
        if (userExits) {
            const password = Bcrypt.hashSync(req.body.password, 10)
            await userExits.update(
                { password },
                { where: { email: req.body.email } }
            )
            const resp = {
                success: true,
                message: 'User password updated successfully!',
            }
            res.status(200).json(resp)
        } else {
            const resp = {
                success: false,
                error: {
                    message: 'User not exits this email! please signup.'
                }
            }
            res.status(404).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

const GenerateNewApiKey = async (req, res) => {
    try {
        const userExits = await User.findOne(
            {
                where: {
                    id: req.userProfile.dataValues.id
                }
            })
        if (userExits) {
            const api_key = Bcrypt.hashSync(req.body.api_key, 10)
            await userExits.update(
                { api_key },
                { where: { id: req.userProfile.dataValues.id } }
            )
            const resp = {
                success: true,
                message: 'User api key updated successfully!',
            }
            res.status(200).json(resp)
        } else {
            const resp = {
                success: false,
                error: {
                    message: 'User does not exist!'
                }
            }
            res.status(404).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: 'Something went wrong',
            error: err
        }
        res.status(500).json(errorObj)
    }
}

module.exports = {
    SignUp,
    Login,
    GoogleLoginSignUp,
    GetRefreshToken,
    Profile,
    UpdateProfile,
    MsgSend,
    EmailSend,
    ResetPassword,
    GenerateNewApiKey
}