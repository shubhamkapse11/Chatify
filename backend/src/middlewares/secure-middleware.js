const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

const secureMiddleware = (req , res , next) => {
    try{
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({message : "Unauthorized"})
        }
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(500).json({message : "Internal server error " + err})
    }
}

module.exports = secureMiddleware