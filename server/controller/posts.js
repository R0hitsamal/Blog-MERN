const Posts = require("../model/posts");

const getPosts = async (req, res) => {
  try {
    const data = await Posts.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching data"});
  }
};
const getMyPosts = async (req, res) => {
  const {username} = req.params;
  try {
    const data = await Posts.find({username: username});
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching data"});
  }
};
const newPost = async (req, res) => {
  try {
    const {title, des} = req.body;
    if (title == "" || des == "") {
      return res
        .status(400)
        .json({message: "Title and description are required"});
    }
    if (!req.file) {
      return res.status(400).json({message: "Image is required"});
    }
    const image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    const userId = req.user.username;
    const post = new Posts({
      title,
      des,
      username: userId,
      image,
    });
    await post.save();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("New Post Error:", error);
    res.status(500).json({success: false, error: "Upload failed"});
  }
};

const getPost = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await Posts.findById(id);

    if (!data) return res.status(404).json({message: "Post not found"});

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching post"});
  }
};

const updatePost = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, des} = req.body;

    const updatedData = {title, des};
    if (req.file) {
      updatedData.image = {
        url: req.file?.path,
        filename: req.file?.filename,
      };
    }
    updatedData.username = req.user.username;

    const Res = await Posts.findByIdAndUpdate(id, updatedData, {new: true});

    if (!Res) return res.status(404).json({message: "Post not found"});

    res.status(200).json({message: "Post updated successfully", updatedData});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error updating post"});
  }
};

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await Posts.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({message: "Post not found"});

    res.status(200).json({message: "Post deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error deleting post"});
  }
};

module.exports = {
  getPost,
  getPosts,
  getMyPosts,
  newPost,
  updatePost,
  deletePost,
};
