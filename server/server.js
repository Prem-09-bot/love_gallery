require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const app = express(); // ✅ FIRST create app

// Middlewares
app.use(cors());
app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

// Static folder (VERY IMPORTANT)
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/photos", require("./routes/photos"));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));