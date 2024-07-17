const orderService = require('../Services/orderService');



const createOrder = async (req, res) => {

    const user = await req.user;

    try {

        const createdOrder = await orderService.createOrder(user, req.body);
        res.status(201).send(createdOrder);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}


const findOrderById = async (req, res) => {

    const user = await req.user;

    try {

        const createdOrder = await orderService.findOrderById(req.params.id);

        res.status(201).send(createdOrder);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}



const orderHistory = async (req, res) => {

    const user = await req.user;
    
    try {

        const createdOrder = await orderService.userOrderHistory(user._id);

        res.status(201).send(createdOrder);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await orderService.deleteOrderById(orderId);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, findOrderById, orderHistory,getAllOrders,deleteOrderById};