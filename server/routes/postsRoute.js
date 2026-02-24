const express = require("express")
const {getPost,getPosts,getMyPosts,newPost,deletePost,updatePost} = require("../controller/posts")
const router =  express.Router()

const {upload} = require('../utils/cloudinaryConfig')

const {isLoggedin, isAuthor} = require('../middleware/Auth.js')


router.get("/",getPosts)
router.get("/:id",getPost)
router.get("/myposts/:username",isLoggedin,getMyPosts)

router.post("/new",isLoggedin,upload.single("image"),newPost)
router.patch("/:id/update",isLoggedin,isAuthor,upload.single("image"),updatePost)

router.delete("/:id/delete",isLoggedin,isAuthor,deletePost)

module.exports =  router;