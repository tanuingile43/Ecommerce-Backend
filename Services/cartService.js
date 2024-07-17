const CartItem = require("../Models/cartItemModel.");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");


const createCart = async (user) => {

  try {
    const cart = new Cart({ user })

    const createdCart = await cart.save();
    return createdCart;

  } catch (error) {
    throw new Error(error.message)
  }

}

// const findUserCart = async (userId) => {
         
//   try {

//     let cart = await Cart.findOne({ user: userId });
//     let cartItems = await CartItem.find({ cart: cart._id }).populate('product');

//     cart.cartItems = cartItems;

//     let totalPrice = 0;
//     let totalItem = 0;
//     let totalDiscountedPrice = 0;


//     for (let cartItem of cart.cartItems) {
//       totalPrice += cartItem.price;
//       totalItem += cartItem.quantity;
//       totalDiscountedPrice += cartItem.discountedPrice;
//     }

//     cart.totalPrice = totalPrice;
//     cart.totalItem = totalItem;
//     cart.discount = totalPrice - totalDiscountedPrice;


//     return cart;

//   } catch (error) {
//     throw new Error(error.message)
//   }
// }


const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    let cartItems = await CartItem.find({ cart: cart._id }).populate('product');

    // Calculate total prices
    let totalPrice = 0;
    let totalItem = 0;
    let totalDiscountedPrice = 0;

    for (let cartItem of cartItems) {
      totalPrice += cartItem.price;
      totalItem += cartItem.quantity;
      totalDiscountedPrice += cartItem.discountedPrice;
    }

    // Update cart with totals
    cart.cartItems = cartItems;
    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountPrice = totalDiscountedPrice; // Update totalDiscountPrice field
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};


const addCartItem = async (userId, req) => {
  try {

    const cart = await Cart.findOne({ user: userId });

    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId })

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id, 
        quantity:1,
        userId,
        price:product.price,
        size:req.size,
        discountedPrice:product.discountedPrice,
      })

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return createdCartItem;
    }

     return isPresent;

  } catch (error) {
    throw new Error(error.message)
  }
}


module.exports = { createCart,findUserCart,addCartItem };