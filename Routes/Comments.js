const express=require("express");
const { addComment, deleteComment } = require("../controller/Comment");

const Auth = require("../middleware/Auth");
const CommentRouter=express.Router()
//comment
CommentRouter.post('/posts/:postId/comments',Auth, addComment);
CommentRouter.delete('/posts/comments/:commentId',Auth,deleteComment);
module.exports=CommentRouter