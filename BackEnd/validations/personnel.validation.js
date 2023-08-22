const Joi = require('joi')

const PersonnelSchema = {
    body: {
        personnel_name: Joi.string().messages({ 'string.empty': 'Please enter personnel name' }).required()
    }
}

const UpdatePersonnelSchema = {
    body: {
        personnel_name: Joi.string().messages({ 'string.empty': 'Please enter personnel name' }).required(),
        personnel_name_position: Joi.number().required()
    }
}

module.exports = {
    PersonnelSchema,
    UpdatePersonnelSchema
}