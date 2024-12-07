const express = require("express");
const {connectMongoDb} = require("./connection")

const { logReqRes } = require("./middlewares/index");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/01-project").then(() => console.log("Mongo Database Connected!"));

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes);

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {console.log(`Server Started at PORT ${PORT}! http://localhost:3000/api/users`
  );
});