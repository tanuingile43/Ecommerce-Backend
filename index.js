const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./Config/db');



// Dotenv path 
dotenv.config({path:"../backend/Config/config.env"});

// Database Connection
connectDatabase();
 

app.listen(process.env.PORT, () =>{
    console.log(`Server : Woriking On http://localhost:${process.env.PORT}`)
})