const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        //required:true,
    },
    quantity: {
        type: Number,
    },
    brand: {
        type: Number,
    },
    color: {
        type: String,
    },
    sizes: [{
        name: { type: String },
        quantity: { type: Number }
    }],
    imageUrl: {
        type: String,
    },
    rating: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratings',
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reviews',
        },
    ],
    numRating: {
        type: Number,
        default: 0,
    },
});

const Product = mongoose.model('products', productSchema);
module.exports = Product