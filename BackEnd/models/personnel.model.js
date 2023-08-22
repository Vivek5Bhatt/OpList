const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const Personnel = sequelize.define(
    "user_personnel",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.STRING,
        },
        personnel_name: {
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
            name: 'user_personnel_id_index',
            using: 'BTREE',
            fields: ['id'],
        }]
    }
)

module.exports = Personnel