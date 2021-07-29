const jwt = require('jsonwebtoken');
const UserSchema = require('../models/userModel');

const auth = async(req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            
            res.status(404).send('No token')
        }else{
            let decoded = jwt.verify(token,process.env.SECRET);
            
            const data = await UserSchema.findById(decoded?.id)
            
            if(data.role == "admin"){
                next()
            }else{
                res.status(404).send('Unauthorized')
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;