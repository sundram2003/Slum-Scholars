import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags
    });

    const savedPost = await post.save();
    res.status(201).json({
      success: true,
      data: savedPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};