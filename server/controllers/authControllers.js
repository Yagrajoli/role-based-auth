const  User  =  require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const register = async(req,res) =>{
    const {username,password,role}  = req.body;
    try {
        if(!username || !password || !role){
        return res.json({message:"All fields are required"})
    }

    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        password:hashPassword,
        role
    })
    await newUser.save();
    res.status(201).json({success:true,message:"User register successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong",error});
    }
}

const login = async(req,res) =>{
    const {username,password}  = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            return  res.status(404).json({success:false,message:"User not found"});
        }

        const validUser = await bcrypt.compare(password,user.password);
        if(!validUser){
            return  res.status(404).json({success:false,message:"not match"});
        }
        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.jwt_secret,
            {
                expiresIn:"1h"
            }
            
        )


        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"});
    }
}

module.exports = {
    register,
    login
}