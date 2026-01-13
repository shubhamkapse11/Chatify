const UserModel = require("../models/user-model");
// const bcrypt = require("bcrypt");


const registerUser = async (req , res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message : "All fields are required"})
    }
    try {
        const user = new UserModel({name , email , password})
        await user.save();
        res.json({message : "User registered successfully"})
    } catch (error) {
        res.status(500).json({message : "User registration failed"})
    }
}

const loginUser = async (req , res) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({message : "All fields are required"})
    }
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        if(user.password !== password){
            return res.status(400).json({message : "Incorrect password"})
        }   
        res.json({message : "User logged in successfully"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

module.exports = {registerUser , loginUser}
