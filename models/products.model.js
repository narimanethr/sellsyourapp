const mongoose=require('mongoose');
const productsSchema=new mongoose.Schema({
  description : String,
  price:{type:Number,min:0},
  sellerId: mongoose.ObjectId
})
module.exports=productsSchema;
const dbConnection=require('../controllers/db.controller');
const Product=dbConnection.model('Product',productsSchema,'market')
module.exports.modle=Product;
