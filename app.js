const express = require('express');
const app = express();
const cors = require('cors');

// Express & Cors 
app.use(express.json());
app.use(cors());

// Auth Routes
const authRoute = require('./Routes/authRoutes');
app.use('/auth',authRoute);

// User Routes
const userRoute = require('./Routes/userRoutes');
app.use('/api/users',userRoute);

// Product Routes
const productRoute = require('./Routes/productRoutes');
app.use('/api/products',productRoute);

// Admin Product Routes
const adminProductRoute = require('./Routes/adminProductRoutes');
app.use('/api/admin/products',adminProductRoute);

// Cart Routes
const cartRoute = require('./Routes/cartRoutes');
app.use('/api/cart',cartRoute);

// Cart Item Routes
const cartItemRoute = require('./Routes/cartItemRoutes');
app.use('/api/cart_items',cartItemRoute);

// Order Routes
const orderRoute = require('./Routes/orderRoute');
app.use('/api/orders',orderRoute);

// Admin Order Routes
const adminOrderRoute = require('./Routes/adminOrderRoutes');
app.use('/api/admin/orders',adminOrderRoute);

// Reviews Routes
const reviewRoute = require('./Routes/reviewRoute');
app.use('/api/reviews',reviewRoute);

// ratings Routes
const ratingRoute = require('./Routes/ratingRoutes');
app.use('/api/ratings',ratingRoute);


module.exports = app;