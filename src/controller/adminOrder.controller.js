const orderService = require("../services/orderService.js");
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


const confirmedOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const orders = await orderService.confirmedOrder(orderId);
    try {
        return res.status(200).send(orders);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const shippOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.shippOrders(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deliverOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deliverOrders(orderId);
        return res.status(500).send({ error: error.message });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }

}

const cancelledOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.canceledOrder(orderId);
        return res.status(500).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


module.exports = {
  getAllOrders,
  confirmedOrder,
  shippOrders,
  cancelledOrders,
  deleteOrders,
  deliverOrders,
};