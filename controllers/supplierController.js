const supplierData = require('../data/supplierData')
const supplierModel = require('../models/supplierModel')

const getAllSuppliers = async (request, response) => {
    let suppliers = await supplierModel.find();
    if (suppliers.length === 0) {
        await supplierModel.insertMany(supplierData);
        suppliers = await supplierModel.find().select('-_id');
    }
    response.status(200).json(suppliers);
};

const addNewSupplier = async (request, response) => {
    let supplierToBeAdded = request.body;
    try {
        let existingSupplier = await supplierModel.findOne({ email: supplierToBeAdded.email }).select('-_id');
        if (existingSupplier) {
            response.status(409).json({ message: `A supplier with email id: ${supplierToBeAdded.email} already exists!` });
        } else {
            let insertedSupplier = await supplierModel.create(supplierToBeAdded);
            response.status(201).json(insertedSupplier);
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchSupplierById = async (request, response) => {
    let { id } = request.params;
    try {
        let supplier = await supplierModel.findById(id).select('-_id');
        if (!supplier) {
            response.status(404).json({ message: "Supplier not found" });
        } else {
            response.status(200).json(supplier);
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
};

const updateSupplier = async (request, response) => {
    const supplierToBeUpdated = request.body;
    try {
        let existingSupplier = await supplierModel.findOne({ email: supplierToBeUpdated.email }).select('-_id');
        if (existingSupplier) {
            let updatedSupplier = await supplierModel.updateOne({ email: supplierToBeUpdated.email }, supplierToBeUpdated);
            response.status(200).json(updatedSupplier);
        } else {
            response.status(404).json({ message: `Supplier with email id ${supplierToBeUpdated.email} doesn't exist!` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const deleteSupplier = async (request, response) => {
    const supplierToBeDeleted = request.body;
    try {
        let existingSupplier = await supplierModel.findOne({ email: supplierToBeDeleted.email }).select('-_id');
        if (existingSupplier) {
            let deletedSupplier = await supplierModel.deleteOne({ email: supplierToBeDeleted.email });
            response.status(200).json(deletedSupplier);
        } else {
            response.status(404).json({ message: `Supplier with email id ${supplierToBeDeleted.email} doesn't exist!` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllSuppliers, addNewSupplier, searchSupplierById, updateSupplier, deleteSupplier };
