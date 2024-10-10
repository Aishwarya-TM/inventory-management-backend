const employeeData = require('../data/employeeData');
const employeeModel = require('../models/employeeModel');

const getAllEmployees = async (request, response) => {
    let employees = await employeeModel.find().select('-_id');
    if (employees.length === 0) {
        await employeeModel.insertMany(employeeData);
        employees = await employeeModel.find().select('-_id');
    }
    response.status(200).json(employees);
};

const searchEmployeeById = async(request, response) =>
{
    let {empId} = request.params;
    try{
        let employee = await employeeModel.findById(empId).select('-_id');
        if(!employee || employee.length === 0){
            response.status(404).json({message: "Employee not found"});
        }
        else{
            response.status(200).json(employee);
        }
    }
    catch{
        response.status(500).json({message: "Internal Server Error"});
    }
}

const addNewEmployee = async (request, response) => {
    let employeeToBeAdded = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeAdded.email }).select('-_id');
        if (existingEmployee) {
            response.status(409).json({ message: `An employee with email id: ${employeeToBeAdded.email} already exists!` });

        }
        let insertedEmployee = await employeeModel.create(employeeToBeAdded);
        response.status(201).json(insertedEmployee);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (request, response) => {
    const employeeToBeUpdated = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeUpdated.email }).select('-_id');
        if (existingEmployee) {
            let updatedEmployee = await employeeModel.updateMany({ email: employeeToBeUpdated.email }, employeeToBeUpdated);
            response.status(200).json(updatedEmployee);
        } else {
            response.status(404).json({ message: `Employee with email id ${employeeToBeUpdated.email} doesn't exists` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (request, response) => {
    const employeeToBeDeleted = request.body;
    try {
        let existingEmployee = await employeeModel.findOne({ email: employeeToBeDeleted.email }).select('-_id');
        if (existingEmployee) {
            let deletedEmployee = await employeeModel.deleteOne({ email: employeeToBeDeleted.email });
            response.status(200).json(deletedEmployee);
        } else {
            response.status(404).json({ message: `Employee with email id ${employeeToBeDeleted.email} doesn't exists` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllEmployees, addNewEmployee, updateEmployee, deleteEmployee, searchEmployeeById}; 
