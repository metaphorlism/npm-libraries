const app = require("./app");
const mongoose = require("mongoose");
const { PORT, DATABASE_URL } = require("./src/config");

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to database . . ."))
  .catch((err) => console.log(err));

// start the server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
