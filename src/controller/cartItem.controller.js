const cartItemService = require("../services/cartItem.service.js");

const updateCartItem = async(req , res) => {
    const user = req.user
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updateCartItem);
    } catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}

const removeCartItems = async (req, res) => {
    const user = req.user
    try {
        await cartService.removeCartItems(user._id, req.params.id);
        return res.status(200).send({message:"cart items removed"});
    }
    catch (error)
    {
        return res.status(500).send({ error: error.message });
    }
}


module.exports = { updateCartItem, removeCartItems };