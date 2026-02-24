const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
    required: true,
    },
    filename: {
      type: String,
    required: true,
    }
  },
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
