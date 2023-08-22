const Personnel = require('../models/personnel.model')

const AddPersonnel = async (req, res) => {
    try {
        const findData = await Personnel.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (findData) {
            const personnelNameExits = findData.dataValues.personnel_name.filter((data) =>
                data.personnel_name === req.body.personnel_name)
            if (personnelNameExits.length) {
                const resp = {
                    success: false,
                    message: `Personnel name already exits!`,
                }
                res.status(409).json(resp)
            } else {
                const createData = [...findData.dataValues.personnel_name, req.body]
                await Personnel.update(
                    { personnel_name: createData },
                    { where: { user_id: req.userProfile.dataValues.id } }
                )
                const resp = {
                    success: true,
                    message: `Personnel updated successfully!`,
                    data: req.body
                }
                res.status(200).json(resp)
            }
        } else {
            const personnelData = {
                user_id: req.userProfile.dataValues.id,
                personnel_name: [req.body]
            }
            let data = await Personnel.create(personnelData)
            if (data && data.id) {
                const resp = {
                    success: true,
                    message: 'Personnel created successfully!',
                    data: req.body
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

const UpdatePersonnel = async (req, res) => {
    try {
        const findData = await Personnel.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (findData) {
            const personnelNameExits = findData.dataValues.personnel_name.filter((data) =>
                data.personnel_name === req.body.personnel_name)
            if (personnelNameExits.length) {
                const resp = {
                    success: false,
                    message: `Personnel name already exits!`,
                }
                res.status(409).json(resp)
            } else {
                let prev = findData.dataValues.personnel_name;
                prev[req.body.personnel_name_position].personnel_name = req.body.personnel_name;
                await Personnel.update(
                    { personnel_name: prev },
                    { where: { user_id: req.userProfile.dataValues.id } }
                )
                const resp = {
                    success: true,
                    message: `Personnel updated successfully!`,
                    data: req.body
                }
                res.status(200).json(resp)
            }
        } else {
            const resp = {
                success: false,
                message: 'Personnel not exists!',
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

const PersonnelDetail = async (req, res) => {
    try {
        const getPersonnel = await Personnel.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (getPersonnel) {
            const resp = {
                success: true,
                message: 'Get personnel data successfully!',
                data: getPersonnel
            }
            res.status(200).json(resp)
        } else {
            const resp = {
                success: true,
                message: 'Get department data not found!',
            }
            res.status(409).json(resp)
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
    AddPersonnel,
    UpdatePersonnel,
    PersonnelDetail,
}