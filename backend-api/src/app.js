require("dotenv").config();
const express = require("express");
const cors = require("cors");

const user = require("./routes/user.routes");
const realEstate = require("./routes/realEstate.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/user", user);
app.use("/api/real_estate", realEstate);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
