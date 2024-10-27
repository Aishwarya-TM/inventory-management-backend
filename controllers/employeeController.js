const employeeData = require('../data/employeeData');
const employeeModel = require('../models/employeeModel');
const bcrypt = require('bcrypt');

const getAllEmployees = async (request, response) => {
    try {
        let employees = await employeeModel.find();
        if (employees.length === 0) {
            for (let employee of employeeData) {
                const salt = await bcrypt.genSalt(10);
                employee.password = await bcrypt.hash(employee.password, salt);
            }

            await employeeModel.insertMany(employeeData);
            employees = await employeeModel.find().select('-_id');
        }
        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const addNewEmployee = async (request, response) => {
    const employeeToBeAdded = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeAdded.email });
        if (existingEmployee) {
            return response.status(409).json({ message: `An employee with email id: ${employeeToBeAdded.email} already exists!` });
        }
        const salt = await bcrypt.genSalt(10);
        employeeToBeAdded.password = await bcrypt.hash(employeeToBeAdded.password, salt);

        const newEmployee = new employeeModel(employeeToBeAdded);
        await newEmployee.save();
        response.status(201).json(newEmployee);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchEmployeeById = async (request, response) => {
    let { id } = request.params;
    try {
        let employee = await employeeModel.findById(id);
        if (!employee) {
            response.status(404).json({ message: "Employee not found" });
        } else {
            response.status(200).json(employee);
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
};


const updateEmployee = async (request, response) => {
    const employeeToBeUpdated = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeUpdated.email });
        if (!existingEmployee) {
            return response.status(404).json({ message: `Employee with email id ${employeeToBeUpdated.email} doesn't exist!` });
        }

        let updatedEmployee = await employeeModel.updateOne({ email: employeeToBeUpdated.email }, employeeToBeUpdated);
        response.status(200).json(updatedEmployee);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (request, response) => {
    const employeeToBeDeleted = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeDeleted.email });
        if (!existingEmployee) {
            return response.status(404).json({ message: `Employee with email id ${employeeToBeDeleted.email} doesn't exist!` });
        }

        let deletedEmployee = await employeeModel.deleteOne({ email: employeeToBeDeleted.email });
        response.status(200).json(deletedEmployee);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllEmployees, addNewEmployee, updateEmployee, deleteEmployee, searchEmployeeById };
