const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");




//CREATE
router.post("/create",async(req,res)=>{
    try{
        const newComment = new Comment(req.body);
        const saved = await newComment.save();
        res.status(200).json(saved);
    } catch(err) {
      console.log("here");
        res.status(500).json(err);
    }
});


//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    console.log("here");
    res.status(500).json(err);
  }
});

// //GET POST
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Comment.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     console.log("here");
//     res.status(500).json(err);
//   }
// });

//get all comments by post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({postId:req.params.postId});
    res.status(200).json(comments);
  } catch (err) {
    console.log("here");
    res.status(500).json(err);
  }
});

//get all posts by user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Comment.find({userId:req.params.userId});
    res.status(200).json(posts);
  } catch (err) {
    console.log("here");
    res.status(500).json(err);
  }
});



module.exports = router;
