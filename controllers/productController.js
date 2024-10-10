const productData = require('../data/productData')
const productModel = require('../models/productModel')

const getAllproducts = async (request, response) => {
    let products = await productModel.find();
    if (products.length == 0) {
        await productModel.insertMany(productData);
        products = await productModel.find();
    }
    response.status(200).json(products)
}

const addNewProduct = async (request, response) => {
    let productToBeAdded = request.body;
    try {
        let exisitingProduct = await productModel.findOne({ upc: productToBeAdded.upc });
        if (exisitingProduct) {
            response.status(409).json({ message: `A product with the same upc ${productModel.upc} already exists!` })
        }
        let insertProduct = await productModel.create(productToBeAdded)
        response.status(200).json(insertProduct)
    }
    catch {
        response.status(500).json({ message: error.message })
    }
}

const updateProduct = async (request, response) => {
    let productToBeUpdated = request.body;
    try {
        let updatedProduct = await productModel.updateMany({ upc: productToBeUpdated.upc }, productToBeUpdated)
        response.status(200).json(updatedProduct)
    }
    catch {
        response.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (request, response) => {
    let productToBeDeleted = request.body;
    try {
        let deletedProduct = await productModel.deleteOne({ upc: productToBeDeleted.upc })
        response.status(200).json(deletedProduct)
    }
    catch {
        response.status(500).json({ message: error.message })
    }
}

module.export = { getAllproducts, addNewProduct, updateProduct, deleteProduct }