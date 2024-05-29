const router = require("express").Router();
const ReadLater = require("../models/ReadLater");
const { verifyToken } = require("../middleware/verifyToken");

// Add post to read later list
router.post("/add", verifyToken, async (req, res) => {
  try {
    const newReadLater = new ReadLater({
      userId: req.user.id,
      postId: req.body.postId,
    });
    const savedReadLater = await newReadLater.save();
    res.status(200).json(savedReadLater);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove post from read later list
router.delete("/remove/:postId", verifyToken, async (req, res) => {
  try {
    await ReadLater.findOneAndDelete({ userId: req.user.id, postId: req.params.postId });
    res.status(200).json("Post removed from read later list");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get read later list for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const readLaterList = await ReadLater.find({ userId: req.user.id }).populate("postId");
    res.status(200).json(readLaterList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
