const express = require("express");
const protectRoute = require("../middlewares/authMiddlewares")

const router = express.Router();

//only admin can access this route
router.get("/admin", protectRoute, (req,res)=>{
    res.json({message:"welcome admin"})
})

//both admin and manager can access this route
router.get("/manager",protectRoute, (req,res)=>{
    res.json({message:"welcome manager"})
})

//both user can access this route
router.get("/user", protectRoute, (req,res)=>{
    res.json({message:"welcome user"})
})
module.exports = router;