const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");

// Mock data for demonstration purposes
// const users = require("./MOCK_DATA.json");
const app = express();
const port = process.env.PORT || 3000;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/01-project")
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.log("MongoDB connection error", err));

// Schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // first_name: String,
  last_name: { type: String }, // last_name: String,
  email: { type: String, required: true, unique: true }, // email: String,
  gender: { type: String }, // gender: String,
  job_title: { type: String }, // job_title: String,
  ip_address: String,
  id: Number,
},
{ timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // Use JSON middleware to handle JSON request bodies

// app.use((req, res, next) => {
//   fs.appendFile(
//     "log.txt",
//     `${new Date().toISOString()} - ${req.method} ${req.url}\n`,
// `${Date.now()} - ${req.method} ${req.path}\n`,
// (err, data) => {
//   next();
//   if (err) {
//     console.error(err);
//   }
// console.log("Log file updated");
// }

// )
// console.log("Assalom alaykum from Middleware 1");
// return res.json({ message: "Hello from Middleware 1" });
//   next();
// });

// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
            ${allDbUsers
            .map((user) => `<li>${user.first_name} - ${user.last_name} - ${user.email}</li>`)
            .join("")}
        </ul>
    `;
  return res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // res.setHeader("x-Content-Type", "application/json");
  // res.setHeader("x-name", "Usman");
  // Always add "X" to custom headers
  // console.log(req.headers);
  return res.json(allDbUsers);
});

// Correct usage of app.route() for chaining methods
app
  .route("/api/users/:id")
  .get( async (req, res) => {
    const user = await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch( async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {last_name: "Usman Nasir"}
      // req.body, {new: true}
    )
    const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);

    return res.json({ status: "success" });
    // if (userIndex === -1) {
      // return res.status(404).json({ error: "User not found" });
    // }

    // Update user
    // const updatedUser = { ...users[userIndex], ...req.body };
    // users[userIndex] = updatedUser;

    // Save to file
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Failed to save user" });
    //   }
    //   res.json(updatedUser);
    // });
  })
  .delete( async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    return res.json({ status: "Success" });

    // if (userIndex === -1) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Delete user
    const deletedUser = users.splice(userIndex, 1);

    // Save to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete user" });
      }
      res.json({ message: "User deleted successfully", deletedUser });
    });
  });

app.post("/api/users", async (req, res) => {
  // Create a new user
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "All fields are required..." });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("Result",result);
  return res.status(201).json({ status: "success", id: result.id });
  
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
  // console.log("Body", body);
});

app.listen(port, () => {
  console.log(
    `App listening on port ${port} ! http://localhost:3000/api/users`
  );
});
