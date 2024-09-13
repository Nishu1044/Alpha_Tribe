const express=require("express")
const { likePost, unlikePost } = require("../controller/Like")
const Auth = require("../middleware/Auth")
const LikeRouter=express.Router()
LikeRouter.post("/posts/:postId/like",Auth,likePost)
// unlike post
LikeRouter.post("/posts/:postId/like",Auth,unlikePost)


module.exports=LikeRouter