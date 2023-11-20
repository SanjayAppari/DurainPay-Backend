const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductsSchema = new Schema({
    keyWord :{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:new Date()
    },
    websiteArray:{
        type:[{
            title:{type:String}, 
            url:{type:String},
            total_review_count:{type:String},
            rating:{type:String},
            price:{type:Number},
            currency:{type:String},
            webSite:{type:String},
        }],
        required:true,
    }
});

// exporting model 
module.exports = mongoose.model('Products', ProductsSchema);

