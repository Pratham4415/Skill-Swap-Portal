const express = require("express");
const app = express();
const dbConn = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const swapRequestRoutes = require("./routes/swapRequestRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConn.dbConnect();

app.get("/", (req, res) => {
  res.send("Skill Swap API Running");
});

app.use("/skill-swap", authRoutes.route);
app.use("/user", userRoutes.route);
app.use("/swapRequest", swapRequestRoutes.route);

app.listen(8000, () => {
  console.log("🚀 Server running on port 8000");
});
