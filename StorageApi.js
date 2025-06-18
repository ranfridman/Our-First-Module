// const { InMemoryStorage } = require('./mamas-storage');
import express from "express";
import { InMemoryStorage } from "./mamas-storage.js";

const storage = new InMemoryStorage();

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("welcome to my storage module api");
});

app.post("/api/users/create", (req, res) => {
  const newUser = storage.create("users", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    password: req.query.password,
    age: req.query.age,
    createAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).json(newUser);
});


app.get("/api/users/:userId/tests", (req, res) => {
  const newTest = storage.where("Tests", { id: req.params.userId });
  console.log("HIIIIIIIIIII", newTest);

  if (newTest.length === 0) {
    return res.status(404).json({ message: "No tests found for this user" });
  } else {
    return res.status(200).json(newTest[0]);
  }
});

app.delete("/api/users/:userId/tests", (req, res) => {
  const deletedTest = storage.remove("Tests", (item) => item.id == req.params.userId);
  console.log("HIIIIIIIIIII", deletedTest);
    return res.status(204).json(deletedTest);
});



app.post("/api/users/:userId/tests/create", (req, res) => {
  const newTest = storage.create("Tests", {
    id: req.params.userId,
    date: req.query.date,
    name: req.query.name,
    grade: req.query.grade,
  });
  res.status(201).json(newTest);
});

// app.get("/api/:resource", (req, res) => {
//   res.send(req.params.resource);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
