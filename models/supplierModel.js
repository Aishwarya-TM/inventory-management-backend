const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9+-._]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/,
    },
    phone: {
      type: String,  
      required: true,
      match: /^\d{10,13}$/, 
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Supplier",  
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
