const UserModel = require("../models/user-model");
// const bcrypt = require("bcrypt");


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const user = new UserModel({ name, email, password })
        await user.save();

        const token = user.generateAccessToken();
        const userData = {
            name: user.name,
            email: user.email,
            _id: user._id
        }
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie("accessToken", token, options).status(201).json({
            message: "User registered successfully",
            data: {
                userData,
                token
            }
        })
    } catch (error) {
        res.status(500).json({ message: "User registration failed , " + error })
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
        console.log("Password is valid" , isValidPass);
        if(!isValidPass){
            return res.status(400).json({message : "Incorrect password"})
        }   
        const token = user.generateAccessToken();
        const userData = {
            name: user.name,
            email: user.email,
            _id: user._id
        }
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) ,
            httpOnly: true
        }
        return res.cookie("accessToken", token, options).status(200).json({message : "User logged in successfully" , 
            data: {
                userData,
                token
            }
        })
    } catch (error) {
        res.status(500).json({message : "Internal server error " + error})
    }
}

const logoutUser = async (req , res) => {
    res.clearCookie("accessToken");
    res.json({message : "User logged out successfully"})
}

const getAllUsers = async (req,res) =>{
    console.log("use-----y" , req)    
    try{
        // const reqUser = req.user._id
        const users = await UserModel.find().select("-password");
        // const reqData = users.
        res.json({message : "Users fetched successfully" , data : users})
    }catch(error){
        res.status(500).json({message : "Internal server error " + error})
    }
}

module.exports = {registerUser , loginUser , logoutUser , getAllUsers}
