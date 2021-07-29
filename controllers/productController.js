const ProductSchema = require("../models/productModel");
const mongoose = require('mongoose')

const createProduct = async(req,res) => {
    
    try {
        const {name,image,price} = req.body;

        const product = await new ProductSchema({name,image,price})
    
        await product.save()

        res.status(200).json({
            message:"Product Created"
        })
    } catch (error) {
        console.log(error)
    }

}

const getProduct = async(req,res) => {
    try {

        const products = await ProductSchema.find({})

        res.status(200).json({
            products
        })
        
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async(req,res) => {
    try {

        const {id} = req.params;

        const product = await ProductSchema.findById(id)

        res.status(200).json({
            product
        })
        
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async(req,res) => {
    try {
        
        const {id} = req.params;
        const {name,image,price} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(404).send('No product with that id') }

        const updatedProduct = await ProductSchema.findByIdAndUpdate(id,{name,image,price},{new:true});

        res.status(200).json(updatedProduct)


    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async(req,res) => {
    try {
        
        const {id} = req.params;
        

        if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(404).send('No product with that id') }

        const deleteProduct = await ProductSchema.findByIdAndDelete(id);

        res.status(200).json("Product deleted")


    } catch (error) {
        console.log(error)
    }
}

module.exports = {createProduct,getProduct,getProductById,updateProduct,deleteProduct}