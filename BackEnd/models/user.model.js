const Sequelize = require("sequelize")
const sequelize = require("../config/connection")

const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        subscription_plan_id: {
            type: Sequelize.STRING,
        },
        subscription_end_date: {
            type: Sequelize.DATE,
        },
        is_accept: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        api_key: {
            type: Sequelize.STRING,
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
            name: 'user_id_index',
            using: 'BTREE',
            fields: ['id'],
        }]
    }
)

module.exports = User