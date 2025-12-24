const express = require("express");
const { pool } = require("../db");

const router = express.Router();
router.post("/create", async (req, res, next) => {
  try {
    const { title, image, location, price } = req.body;
    if (!title || !price || !image || !location) {
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
    const { title, location, price, limit, user_id } = req.query;
    let condition = [];
    let param = [];
    if (!user_id) {
      return res.status(400).json(
        {
          status: "Fail",
          msg: "user_id is required.",
        }
      );
    }
    if (title) {
      condition.push("re.title LIKE ?")
      param.push(`%${title}%`)
    }
    if (location) {
      condition.push("re.location LIKE ?")
      param.push(`%${location}%`)
    }
    if (price) {
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
    const [total] = await pool.query(
      `
        SELECT COUNT(*) as count
        FROM real_estate as re
        ${where}
      `,
      param
    );
    let [result] = await pool.query(
      `
        SELECT * 
        FROM real_estate as re
        ${where}
        ${sqlLimit}
      `,
      param
    );

    if (result.length > 0) {
      result = await Promise.all(
        result.map(async items => {
          let [rsLikes] = await pool.query(
            `
            SELECT COUNT(*) as count
            FROM likes as l
            WHERE l.target_id LIKE ?
          `,
            [items.local_id]
          );
          let [rsUUID] = await pool.query(
            `
            SELECT *
            FROM likes as l
            WHERE l.target_id LIKE ?
            AND l.user_id LIKE ?
          `,
            [items.local_id, user_id]
          );
          items["count_like"] = rsLikes[0] ? rsLikes[0].count : null;
          items["uuid"] = rsUUID[0] ? rsUUID[0].uniq_id : null;
          return items
        })
      )
      res.status(200).json(
        {
          status: "Success",
          msg: "success",
          data: result,
          total: total.total
        }
      );
    } else {
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