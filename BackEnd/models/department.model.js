const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const Department = sequelize.define(
    "user_department",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.STRING,
        },
        department_name: {
            type: Sequelize.JSON,
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
            name: 'user_department_id_index',
            using: 'BTREE',
            fields: ['id'],
        }]
    }
)

module.exports = Department