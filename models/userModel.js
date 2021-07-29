const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
        unique:true
    },
    password: {
        type:String
    },
    role: {
        type:String,
        default:'user'
    }
})

const UserSchema = mongoose.model('users',UserModel)

module.exports = UserSchema;