const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

/* ================= Middleware ================= */
app.use(express.json());
app.use(cors());

/* ================= MongoDB Connection ================= */
mongoose
  .connect(
    "mongodb+srv://bagyaniranjan1326_db_user:14july1988@cluster0.3p8dno1.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Express App is Running");
});



app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

/* ================= Product Schema ================= */
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

/* ================= Add Product ================= */
app.post("/addproduct", async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: Number(req.body.new_price),
      old_price: Number(req.body.old_price),
    });

    await newProduct.save();
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/* ================= Remove Product ================= */
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

/* ================= Get All Products ================= */
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/* ================= User Schema ================= */
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

/* ================= Signup ================= */
app.post("/signup", async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

/* ================= Login ================= */
app.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false });
  }

  const token = jwt.sign({ user: { id: user._id } }, "secret_ecom");
  res.json({ success: true, token });
});

/* ================= New Collections ================= */
app.get("/newcollections", async (req, res) => {
  const products = await Product.find().sort({ date: -1 }).limit(8);
  res.json(products);
});

/* ================= Popular in Women ================= */
app.get("/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" }).limit(4);
  res.json(products);
});

/* ================= Server ================= */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
