const express = require("express");
const app = express();
const sendEmail = require("./utils/email");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Metaphorlism");
});

app.post("/", (req, res) => {
  const { receiver, subject, text } = req.body;
  sendEmail(res, receiver, subject, text);
});

app.listen(8080, () => {
  console.log(`Server is listening on port: 8080`);
});
