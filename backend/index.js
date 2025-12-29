require('dotenv').config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

/* ================= Middleware ================= */
app.use(express.json());
app.use(cors());

/* ================= MongoDB Connection ================= */
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Serve frontend build (make sure your frontend build is at ./dist)
app.use(express.static(path.join(__dirname, "dist")));

/* ================= Test API ================= */
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

/* ================= Image Upload ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // ensure this folder exists or create it at server start
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    image_url: `/images/${req.file.filename}`,
  });
});

/* ================= Product Schema ================= */
const Product = mongoose.model("Product", new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
}));

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
    console.log("✅ Product Saved:", newProduct);

    res.json({ success: true, id });
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= Remove Product ================= */
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= Get All Products ================= */
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= User Schema ================= */
const Users = mongoose.model("Users", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  cartData: { type: Map, of: Number, default: {} }, // safer to use Map for cart
  date: { type: Date, default: Date.now },
}));

/* ================= Signup ================= */
app.post("/signup", async (req, res) => {
  try {
    const check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "User already exists" });
    }

    // Initialize cart with 0 for items 0 to 299
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= Login ================= */
app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, errors: "Wrong Email" });
    }

    if (req.body.password !== user.password) {
      return res.json({ success: false, errors: "Wrong Password" });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= New Collections ================= */
app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ================= Popular in Women ================= */
app.get("/popularinwomen", async (req, res) => {
  try {
    const products = await Product.find({ category: "women" }).limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Middleware to fetch user from token
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

/*==================Add in cart data =============== */
app.post('/addtocart', fetchuser, async (req, res) => {
  try {
    console.log("Add Cart", req.body.itemId);
    let userData = await Users.findById(req.user.id);
    if (!userData.cartData) userData.cartData = {};
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await userData.save();
    res.send("Added");
  } catch (error) {
    res.status(500).send("Error adding to cart");
  }
});

// Remove from cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  try {
    console.log("Remove Cart", req.body.itemId);
    let userData = await Users.findById(req.user.id);
    if (userData.cartData && userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
      await userData.save();
    }
    res.send("Removed");
  } catch (error) {
    res.status(500).send("Error removing from cart");
  }
});

// Get cart data
app.post('/getcart', fetchuser, async (req, res) => {
  try {
    console.log("Get Cart");
    let userData = await Users.findById(req.user.id);
    res.json(userData.cartData || {});
  } catch (error) {
    res.status(500).send("Error fetching cart");
  }
});

// Update product
app.post("/updateproduct", async (req, res) => {
  try {
    await Product.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: Number(req.body.new_price),
        old_price: Number(req.body.old_price),
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    if (!product) {
      return res.status(404).json({ success: false });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ================= Order Schema ================= */
const Order = mongoose.model("Order", new mongoose.Schema({
  userId: { type: String, required: true },

  items: [
    {
      productId: Number,
      name: String,
      price: Number,
      size: String,
      quantity: Number,
    },
  ],

  totalAmount: { type: Number, required: true },

  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String,
  },

  status: { type: String, default: "Placed" }, // Placed, Shipped, Delivered
  createdAt: { type: Date, default: Date.now },
}));

/* ================= Place Order ================= */
app.post("/api/placeorder", fetchuser, async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new Order({
      userId: req.user.id, // MongoDB ObjectId string
      items,
      totalAmount,
      address,
    });

    await newOrder.save();

    // Clear cart after order
    await Users.findByIdAndUpdate(req.user.id, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("❌ Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ================= Server ================= */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
