const fs = require("fs");
const express = require("express");

// Mock data for demonstration purposes
const users = require("./MOCK_DATA.json");
const app = express();
const port = process.env.PORT || 3000;

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
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  return res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  // res.setHeader("x-Content-Type", "application/json");
  // res.setHeader("x-name", "Usman");
  // Always add "X" to custom headers
  // console.log(req.headers);
  return res.json(users);
});

// Correct usage of app.route() for chaining methods
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    // Save to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save user" });
      }
      res.json(updatedUser);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

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

app.post("/api/users", (req, res) => {
  // Create a new user
  const body = req.body;
  if (!body.first_name ||!body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({ error: "All fields are required..." });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
  // console.log("Body", body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port} ! http://localhost:3000/api/users`);
});