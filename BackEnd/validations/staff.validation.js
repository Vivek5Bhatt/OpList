const Joi = require('joi')

const StaffSchema = {
  body: {
    name: Joi.string().messages({ 'string.empty': 'Please enter staff name' }).required(),
    email_address: Joi.string().email().trim().required().messages({ 'string.email': 'Please enter a valid email address' }),
    phone_number: Joi.string().required(),
  }
}

const UpdateStaffSchema = {
  body: {
    id: Joi.string().required(),
    name: Joi.string().messages({ 'string.empty': 'Please enter staff name' }).required(),
    email_address: Joi.string().email().trim().required().messages({ 'string.email': 'Please enter a valid email address' }),
    phone_number: Joi.string().required(),
  }
}

module.exports = {
  StaffSchema,
  UpdateStaffSchema
}