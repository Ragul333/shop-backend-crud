const mongoose = require('mongoose')

const ProductModel = mongoose.Schema({
    name: {
        type:String
    },
    image: {
        type:String
    },
    price: {
        type:Number
    }
})

const ProductSchema = mongoose.model('products',ProductModel)

module.exports = ProductSchema