const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/
    },

    phone: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

},
{
    timestamps: true
},
{
    collection : "Customers"
})

module.export = mongoose.model('Customers', customerSchema)