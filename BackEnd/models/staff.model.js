const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const Staff = sequelize.define(
  "staff",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    email_address: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
  },
  {
    timestamps: false,
  },
  {
    indexes: [{
      name: 'staff_id_index',
      using: 'BTREE',
      fields: ['id'],
    }]
  }
)

module.exports = Staff