const productData = require('../data/productData');
const productModel = require('../models/productModel');

const getAllproducts = async (request, response) => {
    let products = await productModel.find().select('-_id');
    if (products.length == 0) {
        await productModel.insertMany(productData);
        products = await productModel.find().select('-_id');
    }
    response.status(200).json(products);
};

const addNewProduct = async (request, response) => {
    let productToBeAdded = request.body;
    try {
        let exisitingProduct = await productModel.findOne({ upc: productToBeAdded.upc }).select('-_id');
        if (exisitingProduct) {
            return response.status(409).json({ message: `A product with the same upc ${productToBeAdded.upc} already exists!` });
        }
        let insertProduct = await productModel.create(productToBeAdded);
        response.status(201).json(insertProduct);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const updateProduct = async (request, response) => {
    let productToBeUpdated = request.body;
    try {
        let updatedProduct = await productModel.updateOne({ upc: productToBeUpdated.upc }, productToBeUpdated);
        response.status(200).json(updatedProduct);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (request, response) => {
    let productToBeDeleted = request.body;
    try {
        let deletedProduct = await productModel.deleteOne({ upc: productToBeDeleted.upc });
        response.status(200).json(deletedProduct);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchProductByName = async (request, response) => {
    let { productName } = request.params;
    try {
        const formattedCategory = productName.replace(/[\s-]/g, '[-\\s]?');
        const regexPattern = new RegExp(formattedCategory, 'i');

        let product = await productModel.find({ name: regexPattern });
        if (!product || product.length === 0) {
            return response.status(404).json({ message: "No product found!:(" });
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchProductByCategory = async (request, response) => {
    let { productCategory } = request.params;
    try {
        const formattedCategory = productCategory.replace(/[\s-]/g, '[-\\s]?');
        const regexPattern = new RegExp(formattedCategory, 'i');

        let product = await productModel.find({ category: regexPattern });
        if (!product || product.length === 0) {
            return response.status(404).json({ message: "No product found!:(" });
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const searchProductByUPC = async(request, response) =>
{
    let { productUPC } = request.params;
    try {
        
        let product = await productModel.find({ upc: productUPC });
        if (!product || product.length === 0) {
            return response.status(404).json({ message: "No product found!:(" });
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

module.exports = { getAllproducts, 
    addNewProduct, 
    updateProduct, 
    deleteProduct,
     searchProductByName,
      searchProductByCategory, searchProductByUPC};
