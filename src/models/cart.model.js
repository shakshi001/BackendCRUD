const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'users',
        required: true,
    },
    cartItem: [{
        type: mongoose.Schema.Type.ObjectId,
        ref: 'cartItems',
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    totalItem: {
        type: Number,
        required: true,
        default: 0,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    discounte: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;