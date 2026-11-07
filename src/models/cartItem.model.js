const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
    },
    products: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'products',
        required:true,
    },
    size: {
        type: String,
        required:true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price:
    {
        type: Number,
        required:true,
    },
    discountedPrice: {
        type: Number,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'users',
        required:true,
    },

})

const CartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = CartItem;