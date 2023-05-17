const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcryptjs");

// Database connection
mongoose.connect("mongodb://localhost/taskapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User model
const User = mongoose.model("User", {
  username: String,
  password: String,
});

// Create a Task model
const Task = mongoose.model("Task", {
  userId: String,
  text: String,
});

// Middleware setup
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Sign-up endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "xyz", {
      expiresIn: "20s", // Token expiration time
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = await User.findOne({ username });
  if (users) {
    return res.status(409).json({ error: "Username already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPass });
    const data = await user.save();
    res.json(data);
  }
});

// Protected route
app.post("/task", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  try {
    const decoded = jwt.verify(token, "xyz");
    const id = decoded.userId;
    const { text } = req.body;

    const task = new Task({ userId: id, text });
    const data = await task.save();

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});
app.get("/task", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  try {
    const decoded = jwt.verify(token, "xyz");
    const id = decoded.userId;
    console.log(id);
    const data = await Task.find({ userId: id });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
