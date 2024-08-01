const mongoose = require('mongoose');


const connectDatabase = () =>{
    mongoose.connect("mongodb://localhost:27017", {family: 4})
    .then(() => console.log('Database : Mongodb Connected Successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}


module.exports = connectDatabase;