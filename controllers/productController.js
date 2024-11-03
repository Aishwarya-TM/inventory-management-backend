const productData = require('../data/productData');
const productModel = require('../models/productModel');
const mongoose = require('mongoose');

const getAllproducts = async (request, response) => {
    let products = await productModel.find();
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

const searchProduct = async (request, response) => {
    let { query } = request.query;

    try {
        if (!query) {
            return response.status(400).json({ message: "Search query is required" });
        }

        const formattedCategory = query.replace(/[\s-]/g, '[-\\s]?');
        const regexPattern = new RegExp(formattedCategory, 'i');

        const products = await productModel.find({
            $or: [
                { name: regexPattern },
                { category: regexPattern }
            ]
        }).select('-_id');

        if (products.length === 0) {
            return response.status(404).json({ message: "No product for your search query" });
        }

        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const searchProductByUPC = async (request, response) => {
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

const filterProduct = async (request, response) => {
    const { category, priceMin, priceMax, quantityMin, quantityMax } = request.query;
    let filter = {};
    try {
        if (category) {
            filter.category = category;
        }
        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) {
                filter.price.$gte = Number(priceMin);
            }
            if (priceMax) {
                filter.price.$lte = Number(priceMax);
            }
        }
        if (quantityMin || quantityMax) {
            filter.quantity = {};
            if (quantityMin) {
                filter.quantity.$gte = Number(quantityMin);
            }
            if (quantityMax) {
                filter.quantity.$lte = Number(quantityMax);
            }
        }

        const products = await productModel.find(filter);
        if (!products || products.length === 0) {
            return response.status(404).json({ message: "No product found for your search request" });
        }
        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error.message });
    }
};



const trackInventoryLevel = async (request, response) => {
    let { lowStockThreshHold } = request.query;
    lowStockThreshHold = Number(lowStockThreshHold);

    try {
        let product = await productModel.find({
            quantity: { $lte: lowStockThreshHold }
        }).select('name category quantity upc');

        if (!product || product.length === 0) {
            return response.status(404).json({ message: "No product found below the provided quantity" });
        }

        return response.status(200).json(product);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const generateReports = async (request, response) => {
    try {
        const { startDate, endDate } = request.query;
        if (!startDate || !endDate) {
            return response.status(400).json({ message: 'Start date and end date are required' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return response.status(400).json({ message: 'Invalid date format' });
        }

        console.log('Start Date:', start);
        console.log('End Date:', end);

       
        const totalProductsAdded = await productModel.countDocuments({
            dateAdded: { $gte: start, $lte: end },
        });

   
        const inventoryValue = await productModel.aggregate([
            {
                $match: {
                    dateAdded: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
                },
            },
        ]);

       
        const totalSales = await productModel.aggregate([
            {
                $match: {
                    dateAdded: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSold: { $sum: '$sold' },
                },
            },
        ]);

       
        const soldItems = await productModel.aggregate([
            {
                $match: {
                    dateAdded: { $gte: start, $lte: end },
                    sold: { $gt: 0 }, 
                },
            },
            {
                $project: {
                    upc: 1,
                    name: 1,
                    quantitySold: '$sold',
                    salePrice: '$price',
                },
            },
        ]);

        return response.status(200).json({
            totalProductsAdded,
            inventoryValue: inventoryValue[0] ? inventoryValue[0].totalValue : 0,
            totalSales: totalSales[0] ? totalSales[0].totalSold : 0,
            soldItems,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: error.message });
    }
};


const restockProduct = async (request, response) => {
    const { _id, quantity } = request.body;

    try {
        if (!_id || !quantity) {
            return response.status(400).json({ message: 'Please provide product id and quantity.' });
        }


        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(400).json({ message: 'Invalid product id.' });
        }

        const product = await productModel.findById(_id);
        if (!product) {
            return response.status(404).json({ message: 'Product not found.' });
        }

        product.quantity += Number(quantity);
        product.lastUpdated = Date.now();
        await product.save();

        return response.status(200).json(product);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};






module.exports = {
    getAllproducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    searchProductByUPC,
    filterProduct,
    trackInventoryLevel,
    generateReports,
    restockProduct
};
