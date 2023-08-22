const Joi = require('joi')

const Validate = (schema) => {
    return (req, res, next) => {
        try {
            if (!schema) {
                return next()
            }
            const obj = {};
            ['params', 'body', 'query'].forEach(function (key) {
                const k = key
                if (schema[k]) {
                    obj[k] = req[k]
                }
            })
            const joiSchema = Joi.object(schema)
            const { error } = joiSchema.validate(obj)
            if (error) {
                const field = error.details[0].path.join('.')
                const message = error.details[0].message
                    .replace(/"/g, "'")
                    .replace('body.', '')
                    .replace('params.', '')
                    .replace('query.', '')
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: message,
                        error: { message, field },
                    })
            }
            return next()
        } catch (error) {
            return next()
        }
    }
}

module.exports = Validate
