const reviewService = require("../services/review.service.js");


const createReview = async (res, req) => {
    const user = req.user;
    
    try
    {
        const review = await reviewService.createReview(req.body, user);
        return re.status(201).send(review);
    }
    catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}


const getAllReviews = async (res, req) => {
    const productId = req.params.product;
    const user = req.user
    try
    {
        const review = await reviewService.getAllReview(productId);
        return res.status(201).send(reviews);
    }
    catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
  getAllReviews,
  createReview,
};