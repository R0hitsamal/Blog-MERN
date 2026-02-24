const Posts = require("../model/posts");

const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(201).json({message: "You are not logged in"});
};
const isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currUser = req.user.username;

    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.username !== currUser) {
      return res.status(403).json({
        message: "You are not the owner of this post",
        isAuthor: false,
      });
    }

    next();
  } catch (err) {
    console.error("isAuthor error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {isLoggedin, isAuthor};
