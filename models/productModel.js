const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    unit: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    upc: {
      type: Number,
      unique: true,
      required: true,
      index: true,
    },
    weight: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    reorderLevel: {
      type: Number,
      default: 10,
      min: 0,
    },
    SKU: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    dateAdded: {
      type: Date,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Products", productSchema);
