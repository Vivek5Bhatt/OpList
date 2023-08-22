const Joi = require('joi')

const DepartmentSchema = {
    body: {
        department_name: Joi.string().messages({ 'string.empty': 'Please enter department name' }).required()
    }
}

const UpdateDepartmentSchema = {
    body: {
        department_name: Joi.string().required().messages({ 'string.empty': 'Please enter department name' }),
        department_name_position: Joi.number().required()
    }
}

module.exports = {
    DepartmentSchema,
    UpdateDepartmentSchema
}