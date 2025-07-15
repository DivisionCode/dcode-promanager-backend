const express = require("express");
const router = express.Router();
const { createProject, getProjects } = require("../controllers/projectController");
const { searchProjects } = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", createProject);
router.get("/search", searchProjects);

module.exports = router;