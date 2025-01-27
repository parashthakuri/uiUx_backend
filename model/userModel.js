const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
    }, 
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    profileImage:{
        type: String,
        default: null,
    },
    isAdmin: {
        type : Boolean,
        default : false,
    }
})

const Users = mongoose.model('User', userSchema);
module.exports = Users;