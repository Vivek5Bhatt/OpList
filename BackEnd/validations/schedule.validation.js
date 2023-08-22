const Joi = require('joi')

const CreateScheduleSchema = {
    body: {
        request_id: Joi.string().uuid(),
        email: Joi.string().email().trim().required(),
        api_key: Joi.string().required(),
        staffs: Joi.array().items(Joi.string()).required(),
        shifts: Joi.array().items(Joi.string()).required(),
        sub_departments: Joi.array().items(Joi.string()).required(),
        days: Joi.array().items(Joi.string()).required(),
        solver_parameters: {
            VARDIYA_SURELERI: Joi.array().items(Joi.number().required()),
            GUN_PUANLARI: Joi.array().items(Joi.number()).required(),
        },
        solver_constraints: {
            REQUIRED_PERSONNEL_NUMBER_EXACT: Joi.array().items(Joi.array().items(Joi.array().items(Joi.number()))).required(),
            PERSONNEL_HOLIDAYS: Joi.array().items(Joi.array().items(Joi.number())),
            MUST_DAYS: Joi.array().items(Joi.array().items(Joi.number())),
            EXACT_WORK: Joi.array().items(Joi.array().items(Joi.array().items(Joi.array().items(Joi.number())))),
            MIN_MAX_WORKHOUR_LIMITS: Joi.array().items(Joi.array().items(Joi.number())),
            MIN_MAX_SHIFT_LIMITS: Joi.array().items(Joi.array().items(Joi.array().items(Joi.number()))),
            TWO_CONSECUTIVE_WORK: Joi.array().items(Joi.number().required()),
            THREE_CONSECUTIVE_WORK: Joi.array().items(Joi.number().required()),
            MIN_MAX_POINT_LIMITS: Joi.array().items(Joi.array().items(Joi.number())),
            ELIGIBLE_DOCTORS: Joi.array().items(Joi.array().items(Joi.number())),
            MIN_MAX_WORK_LIMITS: Joi.array().items(Joi.array().items(Joi.number())),
            EXACT_NOT_WORK: Joi.array().items(Joi.array().items(Joi.array().items(Joi.array().items(Joi.number())))),
        }
    }
}

const GetStatusScheduleSchema = {
    body: {
        request_id: Joi.string().uuid().required(),
        email: Joi.string().email().trim().required(),
        api_key: Joi.string().required(),
    }
}

module.exports = {
    CreateScheduleSchema,
    GetStatusScheduleSchema,
}