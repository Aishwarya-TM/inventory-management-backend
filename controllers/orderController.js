const orderData = require('../data/orderData')
const orderModel = require('../models/orderModel')

const getAllOrder = async (request, response) => {
    let orders = await orderModel.find();
    if (!orders || orders.length === 0) {
        await orderModel.insertMany(orderData);
        orders = await orderModel.find();
    }
    response.status(200).json(orders);
};

const addNewOrder = async (request, response) => {
    let orderToBeAdded = request.body;
    try {
        let newOrder = await orderModel.create(orderToBeAdded);
        response.status(201).json(newOrder);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchOrderById = async (request, response) => {
    let { id } = request.params;
    try {
        let order = await orderModel.findById(id).select('-_id');
        if (!order) {
            response.status(404).json({ message: "Order not found" });
        } else {
            response.status(200).json(order);
        }
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
};

const updateOrder = async (request, response) => {
    const orderToBeUpdated = request.body;
    try {
        let existingOrder = await orderModel.findOne({ _id: orderToBeUpdated._id }).select('-_id');
        if (existingOrder) {
            let updatedOrder = await orderModel.updateMany({ _id: orderToBeUpdated._id }, orderToBeUpdated);
            response.status(200).json(updatedOrder);
        } else {
            response.status(404).json({ message: `Order with id ${orderToBeUpdated._id} doesn't exist!` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (request, response) => {
    const orderToBeDeleted = request.body;
    try {
        let existingOrder = await orderModel.findOne({ _id: orderToBeDeleted._id }).select('-_id');
        if (existingOrder) {
            let deletedOrder = await orderModel.deleteOne({ _id: orderToBeDeleted._id });
            response.status(200).json(deletedOrder);
        } else {
            response.status(404).json({ message: `Order with id ${orderToBeDeleted._id} doesn't exist!` });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = { getAllOrder, addNewOrder, searchOrderById, updateOrder, deleteOrder };
