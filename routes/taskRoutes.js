// routes/taskRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Temporary test handlers
const getTasks = (req, res) => res.send("📋 All tasks");
const createTask = (req, res) => res.send("✅ Task created");

router.get("/", getTasks);      // Must pass valid functions
router.post("/", createTask);   // No undefined allowed

module.exports = router;