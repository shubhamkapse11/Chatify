const UserModel = require("../models/user-model");
// const bcrypt = require("bcrypt");


const registerUser = async (req , res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message : "All fields are required"})
    }
    try {
        const user = await new UserModel({name , email , password})
        await user.save();
        res.json({message : "User registered successfully"})
    } catch (error) {
        res.status(500).json({message : "User registration failed , " + error})
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
        const isValidPass = await user.isPasswordCorrect(password);
        if(!isValidPass){
            return res.status(400).json({message : "Incorrect password"})
        }   
        const token = user.generateAccessToken();
        const userData = {
            name: user.name,
            email: user.email,
            _id: user._id
        }
        return res.status(200).json({message : "User logged in successfully" , 
            data: {
                userData,
                token
            }
        })
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

module.exports = {registerUser , loginUser}
