// employeeSchema.js (model)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN } = require('../configurations/config');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true, match: /^\d{10,15}$/ },
    role: { type: String, default: 'employee', enum: ['employee', 'admin'] },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    collection: 'Employees',
});

employeeSchema.pre('save', function(next) {
    const user = this

    if (!user.isModified('password')) return next()
    bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error)

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error)

            user.password = hash
            next()
        })
    })
});

employeeSchema.methods.generateAccessJWT = function() {
    const payload = { id: this._id, role: this.role };  
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '30m' });
};

module.exports = mongoose.model('Employees', employeeSchema);
