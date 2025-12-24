const express = require("express");
const { pool } = require("../db");

const router = express.Router();
router.post("/update", async (req, res, next) => {
  try {
    const { user_id, target_id, status, uniq_id} = req.body;
    if(!user_id || !target_id || !status || !uniq_id){
        return res.status(400).json({
            status: "Fail",
            msg: "user_id, target_id, status, uniq_id are required",
        });
    }
    const rsInsert = await pool.query(
    `INSERT INTO likes (user_id, target_id, uniq_id, like_status) 
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        like_status = 1,
        updated_at = CURRENT_TIMESTAMP;`,
      [user_id, target_id, uniq_id, status]
    );
    if(rsInsert.affectedRows <= 0){
        res.status(200).json(
            {
                status: "Fail",
                msg: "fail"
            }
        );    
        return;
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