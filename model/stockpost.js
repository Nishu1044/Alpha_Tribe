const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  likesCount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

const Post=mongoose.model('Post', postSchema);

module.exports = Post