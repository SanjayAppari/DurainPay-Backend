const mongoose = require('mongoose'); // to use mongoose
const mongoURI = "mongodb+srv://apparisanjaym6:sanjay@ecommerce.q4icnqs.mongodb.net/E-Commerce"; // uri for mongodb connection

const connectToDb = async ()=>{
    //connection
    try {
     mongoose.connect(mongoURI, await console.log('Connected to Mongodb'));
    } catch (error) {
        console.log(error);
    }
}
// exporting to use in project
module.exports = connectToDb;

                     