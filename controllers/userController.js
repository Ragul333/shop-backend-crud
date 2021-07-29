const UserSchema = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const userRegister = async (req,res) =>{

    try {
        const {name,email,password,role} = req.body;

        const user =  await UserSchema.findOne({email})
    
        if(user) {return res.status(400).json({message:"User already exists"})}
        
        const hashPass = await bcrypt.hash(password,12)

        const data = new UserSchema({
            name,email,password:hashPass,role
        })
        
        // Create new User
        await data.save()

        //Create Token 
        const token = jwt.sign({id:data._id},process.env.SECRET,{expiresIn:"1hr"})
        
        res.status(200).json({
            message:"User Registered", token
        })
    } catch (error) {
        console.log(error)
    }


}

const userLogin = async (req,res) => {
    try {
    
    const {email,password} = req.body;

    const user = await UserSchema.findOne({email})

    if(!user) {return res.status(400).json({message:"User not registered"})}

    const hashedPassword = await bcrypt.compare(password,user.password)

    if(!hashedPassword){ return res.status(400).json({message:"Wrong Password"})}

    const token = await jwt.sign({id:user._id },process.env.SECRET,{expiresIn:"1h"})

    res.status(200).json({
        message:"User Logged In",
        token
    })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {userRegister,userLogin}