const Post = require("../model/stockpost");


// Like a post
const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the foundPost is already liked by the user
    if (foundPost.likesCount.includes(req.user.id)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    foundPost.likesCount.push(req.user.id);
    await foundPost.save();

    res.json({success: true,message: 'Post liked'});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Unlike a post
const unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id; // Get the user ID from the request
  
    try {
      // Find the post by ID
      const foundPost = await Post.findById(postId);
      if (!foundPost) return res.status(404).json({ message: 'Post not found' });
            
      // Check if the user has already liked the post
      if (!foundPost.likesCount.includes(userId)) {
        return res.status(400).json({ message: 'Post not liked by this user' });
      }
  
  
      // Remove the user's ID from the likesCount array
      foundPost.likesCount = foundPost.likesCount.filter(id => id.toString() !== userId);
      await foundPost.save();
  
      res.json({ success: true,message: 'Post unliked'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { likePost,unlikePost};
