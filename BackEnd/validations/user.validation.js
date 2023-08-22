const Joi = require('joi')

const SignUpSchema = {
    body: {
        name: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().email().trim().required().messages({ 'string.email': 'Please enter a valid email address' }),
        password: Joi.string().required(),
        is_accept: Joi.boolean().messages({ 'any.required': 'Please accept checkbox first.' }).required(),
    }
}

const LoginSchema = {
    body: {
        email: Joi.string().email().trim().required().messages({ 'string.email': 'Please enter a valid email address' }),
        password: Joi.string().required(),
    }
}

const SendEmailSchema = {
    query: {
        email: Joi.string().email().trim().required().messages({ 'string.email': 'Please enter a valid email address' }),
        type: Joi.string().required(),
    }
}

const UpdateProfile = {
    body: {
        name: Joi.string(),
        phone_number: Joi.string().messages({ 'string.base': 'Please enter a phone number' }),
    }
}

module.exports = {
    SignUpSchema,
    LoginSchema,
    SendEmailSchema,
    UpdateProfile
}