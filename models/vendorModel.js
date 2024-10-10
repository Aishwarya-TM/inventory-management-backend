const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true
    },

    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/
    },

    phone:{
        type: Number,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    productsSupplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', 
      }],
},
{
    timestamps: true
},
{
    collection: "Vendors"
})

module.export = mongoose.model('Vendors', vendorSchema)