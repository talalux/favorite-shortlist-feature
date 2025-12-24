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
router.get("/list", async (req, res, next) => {
  try {
    const { title, location, price, limit } = req.query;
    let condition = [];
    let param = [];
    if(title){
      condition.push("re.title LIKE ?")
      param.push(`%${title}%`)
    }
    if(location){
      condition.push("re.location LIKE ?")
      param.push(`%${location}%`)
    }
    if(price){
      condition.push("re.price LIKE ?")
      param.push(`%${price}%`)
    }
    let where = condition.length > 0 ? `WHERE ${condition.join(" OR ")}` : ""
    let sqlLimit = "";
    if (limit) {
      const lim = Number(limit);
      if (!Number.isNaN(lim) && lim > 0) {
        sqlLimit = "LIMIT ?";
        param.push(lim);
      }
    }
    const [result] = await pool.query(
      `
        SELECT * 
        FROM real_estate as re
        ${where}
        ${sqlLimit}
      `,
      param
    );
    if(result.length > 0){
      res.status(200).json(
          {
              status: "Success",
              msg: "success",
              data: result,
              total: result.length
          }
      );
    }else{
      res.status(400).json(
          {
              status: "Fail",
              msg: "no data.",
              data: null
          }
      );
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;