const Cart = require("../models/cart.model.js");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try
  {
    let cart = await Cart.findOne({ user: user });
    let cartItems = await cartItems.find({ cart: cart._id }).populate("product");
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItems = 0;

    for (let cartItem of cart.cartItems)
    {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItems+=cartItem.quantity
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItems;
    cart.discounte = totalPrice - totalDiscountedPrice;

    return cart;
    
  }
  catch (error)
  {
      throw new Error(error.message)
  }
}

async function addCartItem(userId, req){
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await product.findById(req.productId);
    const isPresent = await CartItem.findOne({ cart: cart.id, product: product._id, userId });

    if (!isPresent) {
      const cartItem = new cartItem.findOne({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice
      })

      const createdCartItem = await cartItem.save();
      cart.cartItem
    }
  }
  catch (error)
  {
    throw new Error(error.message);
     
  }
}


module.exports = { createCart  , findUserCart , addCartItem};
