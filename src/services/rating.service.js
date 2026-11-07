const Rating = require("../models/rating.model.js");

const ProductService = require("../services/product.service.js");

async function createRating(req, res) {
    const product = ProductService.findProductById(req.productId);
    const rating = new Rating({
        prooduct: product._id,
        user: user._id,
        rating: req.rating,
        createdAt:new Date()

    })
    return await rating.save();
}


async function getProductRating(productId) {
    return await Rating.find({ product: productId });
}

module.exports = {
    createRating,
    getProductRating,
}