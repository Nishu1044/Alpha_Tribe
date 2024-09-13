const express=require("express")
const {createStockPost, getAllStockPosts, getSingle, deleteSingle} = require("../controller/Post")
const Auth = require("../middleware/Auth")
const { addComment } = require("../controller/Comment")
const PostRouter=express.Router()
// Stock router
PostRouter.post("/posts",Auth,createStockPost)
// get post filter and sort
PostRouter.get("/posts",getAllStockPosts)
//get single
PostRouter.get("/posts/:postId",getSingle)
//delete
PostRouter.delete("/posts/:postId",deleteSingle)
module.exports=PostRouter