const express = require("express");
const { pool } = require("../db");

const router = express.Router();
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  
  try {
    const { username, nickname } = req.body;
    if(!username || !nickname){
        return res.status(400).json({
            status: "Fail",
            msg: "username, nickname are required",
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
    const { user_id, username, nickname } = req.query;
    let condition = []
    let param = []
    if(user_id){
      condition.push("u.user_id LIKE ?")
      param.push(`%${user_id}%`)
    }
    if(username){
      condition.push("u.username LIKE ?")
      param.push(`%${username}%`)
    }
    if(nickname){
      condition.push("u.nickname LIKE ?")
      param.push(`%${nickname}%`)
    }
    let where = condition.length > 0 ? `WHERE ${condition.join(" OR ")}` : ""
    const [result] = await pool.query(
      `
        SELECT * 
        FROM user as u
        ${where}
      `,
      param
    );
    if(result.length > 0){
      res.status(200).json(
          {
              status: "Success",
              msg: "success",
              data: result
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
