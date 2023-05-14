const express = require("express");
const app = express();
const { PORT } = require("./src/config");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO FROM METAPHORLISM");
});

const AUTH = require("./src/routes/auth.routes");

app.use("/auth", AUTH);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
