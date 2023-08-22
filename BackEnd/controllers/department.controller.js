const Department = require('../models/department.model')

const AddDepartment = async (req, res) => {
    try {
        const findData = await Department.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (findData) {
            const departmentNameExits = findData.dataValues.department_name.filter((data) =>
                data.department_name === req.body.department_name)
            if (departmentNameExits.length) {
                const resp = {
                    success: false,
                    message: `Department name already exits!`,
                }
                res.status(409).json(resp)
            } else {
                const createData = [...findData.dataValues.department_name, req.body]
                await Department.update(
                    { department_name: createData },
                    { where: { user_id: req.userProfile.dataValues.id } }
                )
                const resp = {
                    success: true,
                    message: `Department updated successfully!`,
                    data: req.body
                }
                res.status(200).json(resp)
            }
        } else {
            const departmentData = {
                user_id: req.userProfile.dataValues.id,
                department_name: [req.body]
            }
            let data = await Department.create(departmentData)
            if (data && data.id) {
                const resp = {
                    success: true,
                    message: 'Department created successfully!',
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

const UpdateDepartment = async (req, res) => {
    try {
        const findData = await Department.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (findData) {
            const departmentNameExits = findData.dataValues.department_name.filter((data) =>
                data.department_name === req.body.department_name)
            if (departmentNameExits.length) {
                const resp = {
                    success: false,
                    message: `Department name already exits!`,
                }
                res.status(409).json(resp)
            } else {
                let prev = findData.dataValues.department_name;
                prev[req.body.department_name_position].department_name = req.body.department_name;
                await Department.update(
                    { department_name: prev },
                    { where: { user_id: req.userProfile.dataValues.id } }
                )
                const resp = {
                    success: true,
                    message: `Department updated successfully!`,
                    data: req.body
                }
                res.status(200).json(resp)
            }
        } else {
            const resp = {
                success: false,
                message: 'Department not exists!',
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

const DepartmentDetail = async (req, res) => {
    try {
        const getDepartment = await Department.findOne({
            where: {
                user_id: req.userProfile.dataValues.id
            }
        })
        if (getDepartment) {
            const resp = {
                success: true,
                message: 'Get department data successfully!',
                data: getDepartment
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
    AddDepartment,
    UpdateDepartment,
    DepartmentDetail,
}