const mongoose = require('mongoose')
const { collection } = require('./productModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'manager', 'staff'],
        default: 'staff',
      },
},
{
    timestamps: true,
},
{
    collection:  'Users',

}
)

module.export('Users',userSchema);