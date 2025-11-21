const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// ⚠️ Ensure JWT secret exists
// =========================================================
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("❌ MISSING JWT SECRET in .env");
  process.exit(1);
}


// =========================================================
// ✅ REGISTER
// =========================================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // ❗ Do NOT hash manually — your model already hashes password
    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// =========================================================
// ✅ LOGIN
// =========================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...safeUser } = user.toObject();

    return res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// =========================================================
// ✅ UPDATE PROFILE (name, email)
// =========================================================
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email)
      return res.status(400).json({ error: "Nothing to update" });

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== req.user.id) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// =========================================================
// ✅ UPDATE PASSWORD
// =========================================================
router.put("/update-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ error: "Both old and new passwords are required" });

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Old password is incorrect" });

    user.password = newPassword; // model will hash it automatically
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Update password error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// =========================================================
// ✅ DELETE ACCOUNT
// =========================================================
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.user.id);

    if (!deleted)
      return res.status(404).json({ error: "User not found" });

    return res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// =========================================================
// ✅ GET LOGGED-IN USER /me
// =========================================================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch (err) {
    console.error("❌ /me error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
