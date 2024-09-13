const Comment = require("../model/Comment");
const Post = require("../model/stockpost");
// add comment
const addComment = async (req, res) => {
    const { comment } = req.body;
    const existingComment = await Comment.findOne({ comment });

    // check is allready present
    if (existingComment) {
      return res.json({message:"Comment already exists"});
    }
    try {
      const commentToAdd = new Comment({
        comment, 
        post:req.params.postId,  
        user:req.user.id 
    });
    await commentToAdd.save();
    res.status(201).json({success: true,commentToAdd,message: 'Comment added successfully'});
    // console.log(commentToAdd)

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  
  // delete comment
// Delete a comment from a post

const deleteComment = async (req, res) => {
  const {  commentId } = req.params;

  try {
    const post = await Comment.findByIdAndDelete(commentId);

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

  module.exports={addComment,deleteComment}