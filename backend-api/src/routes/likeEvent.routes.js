const express = require("express");
const { pool } = require("../db");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
router.post("/update", async (req, res, next) => {
  try {
    const { user_id, target_id, status, uniq_id} = req.body;
    let uuid = uniq_id;
    if(!uniq_id || uniq_id == ""){
      uuid = uuidv4();
    }
    if(!user_id || !target_id || !status){
        return res.status(400).json({
            status: "Fail",
            msg: "user_id, target_id, status are required",
        });
    }
    if(!parseInt(status) && parseInt(status) !== 0){
      return res.status(400).json({
            status: "Fail",
            msg: "invalid status value.",
        });
    }
    const rsInsert = await pool.query(
      `
      INSERT INTO likes (user_id, target_id, uniq_id, like_status)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
          like_status = VALUES(like_status),
          updated_at = CURRENT_TIMESTAMP
      `,
      [user_id, target_id, uuid, status]
    );
    if(rsInsert.affectedRows <= 0){
        return res.status(200).json(
            {
                status: "Fail",
                msg: "fail"
            }
        );
    }
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

module.exports = router;