const Post = require("../model/stockpost");

// Create a stock post
const createStockPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  try {
    const newPost = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id, 
    });
    await newPost.save();
    res.status(201).json({ success: true, post: newPost, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts with filtering and sorting
const getAllStockPosts  = async (req, res) => {
  // Extract query parameters from the request
  const { stockSymbol, tags, sortBy } = req.query;

  // Initialize an empty query object
  let filterOptions = {};

  // Check if a stockSymbol was provided in the query
  if (stockSymbol) {
    // Add the stockSymbol to the query object
    filterOptions.stockSymbol = stockSymbol;
  }

  // Check if tags were provided in the query
  if (tags) {
    // Split the tags string into an array and add to the query object
    const tagsArray = tags.split(',');
    filterOptions.tags = { $in: tagsArray };
  }

  try {
    // Fetch posts based on the query object
    let stockPosts;

    // Check the sortBy parameter to determine sorting order
    if (sortBy === 'likesCount') {
      // Sort by likesCount in descending order
      stockPosts  = await Post.find(filterOptions).sort({ likesCount: -1 }).populate('user', 'username');
    } else {
      // Default to sorting by createdAt in descending order
      stockPosts = await Post.find(filterOptions).sort({ createdAt: -1 }).populate('user', 'username');
    }

    // Send the retrieved posts as a JSON response
    res.json(stockPosts);
  } catch (error) {
    // Handle any errors that occurred during the query
    res.status(500).json({ error: error.message });
  }
};


// ⦁	Get a Single Stock Post 
const getSingle=async(req,res)=>{
  const {postId}=req.params
  try {
    const post=await Post.findById(postId)
    console.log("singledata",post)
    res.json({ postId:post._id, stockSymbol:post.stockSymbol, title:post.title, description:post.description, likesCount:post.likesCount
    })
  } catch (error) {
    res.send("something went wrong")
  }
}
// delete
const deleteSingle=async(req,res)=>{
  const {postId}=req.params
  try {
    const post=await Post.findByIdAndDelete(postId)
    console.log("singledata",post)
    res.json({ success: true, message: 'Post deleted successfully' }
    )
  } catch (error) {
    res.send("something went wrong")
  }
}



module.exports={createStockPost,getAllStockPosts ,getSingle,deleteSingle}