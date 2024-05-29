const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");




//CREATE
router.post("/create",async(req,res)=>{
    try{
        const newPost = new Post(req.body);
        const saved = await newPost.save();
        res.status(200).json(saved);
    } catch(err) {
        res.status(500).json(err);
    }
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({postId:req.params.id});
    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL POSTS
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json(posts);
//   } catch (err) {
//     console.log("here");
//     res.status(500).json(err);
//   }
// });

//get all posts by user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({userId:req.params.userId});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH POSTS
router.get("/",async(req,res)=>{
    try{
        const query=req.query;
        const searchFilter={
            title:{$regex: query.search, $options:"i"}
        }
        const posts = await Post.find(query.search?searchFilter:null);
        res.status(200).json(posts);

    } catch(err) {
        res.status(500).json(err);
    }
});

// Upvote a post
// Upvote a post
router.post('/upvote', async (req, res) => {
  const { postId, userId } = req.body;
  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      const index = post.upvotes.indexOf(userId);
      if (index === -1) {
          post.upvotes.push(userId); // Add userId to upvotes
      } else {
          post.upvotes.splice(index, 1); // Remove userId from upvotes
      }

      await post.save();
      res.status(200).json({ success: true, upvotes: post.upvotes.length });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
