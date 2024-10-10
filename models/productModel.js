const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    description: {
        type: String
    },
    unit: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    upc: {
        type: Number,
        unique: true,
        required: true
    },
    weight: {
        type: Number
    },
    category: {
        type: String,
        required: [true, "Please add a category"]
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendorData',
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },

},
    {
        timestamps: true
    },
    {
        collection: "Products"
    })

module.exports = mongoose.model("Products", productSchema);