const mongoose = require('mongoose');



const cartItemSchema = new mongoose.Schema({

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    size: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
    },
    discountedPrice: {
        type: Number,
       
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

})



const CartItem = mongoose.model('cartItems', cartItemSchema);

module.exports = CartItem;