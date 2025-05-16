const jwt  = require("jsonwebtoken");

const protectRoute  = async(req,res,next) =>{
    let token;
    let authHeader = req.headers.Authorization ||  req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"No Token authorization denied"})
        }

        try {
            const decode = jwt.verify(token, process.env.jwt_secret);
            req.user = decode;
            console.log("The decoded user is " , req.user);
            next();
        } catch (error) {
            res.status(400).json({message:"Token is not valid"})
        }
    }
}

module.exports = protectRoute