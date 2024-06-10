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


module.exports = { createOrder, findOrderById, orderHistory };