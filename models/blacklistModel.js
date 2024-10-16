const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: 'Employees',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('blacklists', blackListSchema)