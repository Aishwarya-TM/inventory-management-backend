const userModel = require('../models/employeeModel');
const blackListModel = require('../models/blacklistModel');
const bcrypt = require('bcryptjs');
const employeeModel = require('../models/employeeModel');
const employeeData = require('../data/employeeData');

const loadInitialData = async () => {
    const allUserData = await employeeModel.find();
    if (allUserData.length === 0) {
        for (let userData of employeeData) {
            const newUser = new employeeModel(userData);
            await newUser.save();
        }
        console.log("Initial data loaded");
    }
}

const login = async (request, response) => {
    try {
        await loadInitialData();
        const { email, password, role } = request.body;
        const existingUser = await userModel.findOne({ email }).select('+password +role');

        if (!existingUser) {
            return response.status(401).json({ message: 'Invalid email' });
        }

        const validatePassword = await bcrypt.compare(password, existingUser.password);
        if (!validatePassword) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        if (!role || existingUser.role !== role) {
            return response.status(403).json({ message: 'Access denied. Incorrect role.' });
        }

        let options = {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        const token = existingUser.generateAccessJWT();
        response.cookie('SessionID', token, options);


        response.status(200).json({
            message: 'Login successful',
            role: existingUser.role,
            token: token
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


const logout = async (request, response) => {
    try {
        const authHeader = request.headers['cookie'];
        if (!authHeader) return response.status(204).json({ message: 'No Content' });

        const cookie = authHeader.split('=')[1];
        const accessToken = cookie.split(';')[0];

        const checkIfBlacklisted = await blackListModel.findOne({ token: accessToken });
        if (checkIfBlacklisted) return response.status(204).json({ message: 'No Content' });

        const newBlacklist = new blackListModel({ token: accessToken });
        await newBlacklist.save();

        response.setHeader('Clear-Site-Data', '"cookies"');
        response.status(200).json({ message: 'You are logged out!' });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { login, logout };
