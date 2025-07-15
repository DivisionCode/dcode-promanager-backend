require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connectElastic } = require("./config/elastic");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

require("./config/db")();

connectElastic();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

console.log('authRoutes:', typeof require('./routes/authRoutes'));
console.log('projectRoutes:', typeof require('./routes/projectRoutes'));
console.log('taskRoutes:', typeof require('./routes/taskRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
        console.log("Server is running...");
});
