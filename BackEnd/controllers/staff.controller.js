const Staff = require('../models/staff.model')

const AddStaff = async (req, res) => {
  try {
    const dataToInsert = {
      ...req.body,
      user_id: req.userProfile.dataValues.id
    }
    const data = await Staff.create(dataToInsert)
    const resp = {
      success: true,
      message: `Staff updated successfully!`,
      data: data
    }
    res.status(200).json(resp)
  } catch (err) {
    const errorObj = {
      success: false,
      message: 'Something went wrong',
      error: err
    }
    res.status(500).json(errorObj)
  }
}

const UpdateStaff = async (req, res) => {
  try {
    const findData = await Staff.findOne({
      where: {
        id: req.body.id
      }
    })
    if (findData) {
      await Staff.update(
        {
          name: req.body.name,
          email_address: req.body.email_address,
          phone_number: req.body.phone_number
        },
        { where: { id: req.body.id } }
      )
      const resp = {
        success: true,
        message: `Staff updated successfully!`,
        data: req.body
      }
      res.status(200).json(resp)
    } else {
      const resp = {
        success: false,
        message: 'Staff not exists!',
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

const StaffList = async (req, res) => {
  try {
    const getStaff = await Staff.findAll({
      where: {
        user_id: req.userProfile.dataValues.id
      }
    })
    const resp = {
      success: true,
      message: 'Get staff data successfully!',
      data: getStaff
    }
    res.status(200).json(resp)
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
  AddStaff,
  UpdateStaff,
  StaffList
}