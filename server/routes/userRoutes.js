const express = require("express");
const protectRoute = require("../middlewares/authMiddlewares");
const verifyRole = require("../middlewares/roleMiddlewares");

const router = express.Router();

//only admin can access this route
router.get("/admin", protectRoute, verifyRole("admin"), (req,res)=>{
    res.json({message:"welcome admin"})
})

//both admin and manager can access this route
router.get("/manager",protectRoute, verifyRole("admin", "manager"), (req,res)=>{
    res.json({message:"welcome manager"})
})

//both user can access this route
router.get("/user", protectRoute, verifyRole("admin", "manager", "user"), (req,res)=>{
    res.json({message:"welcome user"})
})
module.exports = router;