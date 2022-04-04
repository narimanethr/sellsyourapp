const mongoose=require('mongoose');
const sellersSchema=new mongoose.Schema({
  budget:{type:Number,min:0,required:true,default:200},
  name : {type:String,required:true},
  login : {
              type : String,
              required : true,
              unique : true
            },
    password : {
                type : String,
                required : true
               }

})
module.exports=sellersSchema;
const dbConnection=require('../controllers/db.controller');
const Sellers=dbConnection.model('Seller',sellersSchema,'sellers')
module.exports.model=Sellers;
