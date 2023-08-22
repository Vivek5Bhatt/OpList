const axios = require('axios')

const CreateSchedule = async (req, res) => {
    try {
        const data = await axios.post(
            'https://api.oplist.io/solver_caller_process_request',
            req.body)
        const resp = {
            success: true,
            message: 'Schedule created successfully!',
            data: data.data
        }
        res.status(200).json(resp)
    } catch (err) {
        const errorObj = {
            success: false,
            message: err.response.data.Error
        }
        res.status(err.response.status).json(errorObj)
    }
}

const ScheduleStatus = async (req, res) => {
    try {
        const data = await axios.post(
            'https://api.oplist.io/solver_caller_get_result',
            req.body)
        if (data && data.data) {
            const resp = {
                success: true,
                data: data.data
            }
            res.status(200).json(resp)
        }
    } catch (err) {
        const errorObj = {
            success: false,
            message: err.response.data.Error,
        }
        res.status(err.response.status).json(errorObj)
    }
}

module.exports = {
    CreateSchedule,
    ScheduleStatus,
}