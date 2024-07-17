const Address = require('../Models/addressModel');
const Order = require('../Models/orderModel');
const cartService = require('../Services/cartService')
const OrderItem = require('../Models/orderItems')

const createOrder = async (user,  shippingAddress) => {

    let address;

    if ( shippingAddress._id) {
        let isExistAddress = await Address.findById( shippingAddress._id);
        address = isExistAddress;

    }
    else {
        address = new Address( shippingAddress);
        address.user = user;
        await address.save();
        user.address = user.address || [];
        user.address.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);

    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice

        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }


    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountPrice: cart.totalDiscountPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address,

    })

    const savedOrder = await createdOrder.save();
    return savedOrder;

}


const placeOrder = async (orderId) => {

    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save()

}

const confirmedOrder = async (orderId) => {

    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";
    return await order.save()

}

const shippOrder = async (orderId) => {

    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";
    return await order.save()

}

const deliverOrder = async (orderId) => {

    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";
    return await order.save()

}

const cancelOrder = async (orderId) => {

    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";
    return await order.save()

}

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order;
}

const userOrderHistory = async (userId) => {
    try {

        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders;


    } catch (error) {
        throw new Error(error.message)
    }

}

const getAllOrders = async () => {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } })
        .lean();
};

const deleteOrderById = async (orderId) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new Error('Order not found');
        }
        return deletedOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};



module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrderById
}