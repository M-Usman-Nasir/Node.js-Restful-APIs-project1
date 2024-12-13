const express = require("express");
// const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
// const mongoose = require("./connection");

const app = express();
const PORT = 9000;

// Connection
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/01-project")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


const uri = `mongodb+srv://Usman-Nasir:C587tMAK8BsODSDU@nodejs.0bumi.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS`

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}! http://localhost:${PORT}/api/users`);
});