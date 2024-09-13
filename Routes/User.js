const express=require("express")
const { Registration, Login, getUserProfile,updateUserProfile } = require("../controller/User")
const Auth = require("../middleware/Auth")
const UserRouter=express.Router()
// Register
UserRouter.post("/register",Registration)
//Login
UserRouter.post("/login",Login)
// Get User



UserRouter.get("/profile/:userId", Auth, getUserProfile);
// update user
UserRouter.put("/profile", Auth,updateUserProfile);
module.exports=UserRouter