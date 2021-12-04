const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
    
})


const User = mongoose.model('User', userschema)

module.exports = User;