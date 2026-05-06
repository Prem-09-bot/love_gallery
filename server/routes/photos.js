const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ✅ Schema
const photoSchema = new mongoose.Schema({
  image: String,
  caption: String
}, { timestamps: true });

const Photo = mongoose.model("Photo", photoSchema);

// ✅ Cloudinary Storage (IMPORTANT)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "love-gallery",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const upload = multer({ storage });

/* =========================
   📤 Upload Photo (CLOUDINARY)
========================= */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newPhoto = new Photo({
      image: req.file.path,   // ✅ Cloudinary URL
      caption: req.body.caption
    });

    await newPhoto.save();

    res.json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   📥 Get All Photos
========================= */
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   🗑️ Delete Photo
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;