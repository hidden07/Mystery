const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (email !== "my@gmail.com") {
            return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || password !== "Mystery07") {
            return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
        }

        const authClaims = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        
        const token = jwt.sign(authClaims, process.env.JWT_SECRET || "Mystery", { expiresIn: "30d" });

        await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

        res.status(200).json({
            id: user._id,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;