const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    review: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('review', reviewSchema);
module.exports = Review;