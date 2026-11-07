const userService = require("../services/user.service");


async function updateCartItem(userId, cartItem, cartItemData) {
    try {
        const item = await findCartItemById(cartItem);
        if (!item)
        {
            throw new Error("not found", cartItem);
        }
        const user = await userService.findUserById(item.userId);
        if (!user)
        {
            throw new Error("user not found: ",userId)
        }
        
        if (user._id.toString() === userId.toString) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const upadtedCartItem = await item.save();
            return upadtedCartItem;
        }
        else
        {
            throw new Error("you can't update this cart item");
        }

    } catch (error)
    {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
        await cartItem.findIdAndDelete(cartItemId)
    }
    throw new Error("you can't remove other users item ");
}

async function findCartItemById(cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    if (cartItem) {
        return cartItem;
    }
    else
    {
        throw new Error("cartitem not found with id ", cartItemId);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}