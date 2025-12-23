const express = require("express");
const { pool } = require("../db");

const router = express.Router();
router.post("/create", async (req, res, next) => {
  try {
    const { title, image, location, price } = req.body;
    if(!title || !price || !image || !location){
        return res.status(400).json({
            status: "Fail",
            msg: "title, image, location, price are required",
        });
    }
    const [result] = await pool.query(
      "INSERT INTO user (username, nickname) VALUES (?, ?)",
      [username, nickname]
    );
    res.status(200).json(
        {
            status: "Success",
            msg: "success"
        }
    );
  } catch (e) {
    next(e);
  }
});