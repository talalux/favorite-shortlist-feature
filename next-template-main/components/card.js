// components/RealEstateCard.jsx
"use client";

import { useEffect, useState } from "react";
import styles from "@styles/card.module.scss";
import { post } from "@/public/utils/api";
import { commas } from "@/public/utils/common";

export default function RealEstateCard({
  image,
  title,
  price,
  location,
  initialLike = 0,
  uniq_id,
  status,
  targetId
}) {
  const [liked, setLiked] = useState(status == '1' ? true : false);
  const [likeCount, setLikeCount] = useState(initialLike);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let findUserId = localStorage.getItem("user_id");
    if(!findUserId) return;
    setUserId(findUserId)
  },[])
  const handleLike = async () => {
    if(userId == "" || !userId) return;
    const postLike = await post(
      process.env.BASE_URL+"likes/update",
      {
        user_id: userId,
        target_id: targetId,
        status: status == "1" ? "0" : "1",
        uniq_id: uniq_id
      }
    );
    if(postLike.status == 'Success'){
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
        <button
          className={`${styles.likeBtn} ${liked ? styles.active : ""} ${userId == "" || userId == null ? styles.disable : ''}`}
          onClick={handleLike}
        >
          ❤️ {likeCount}
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.price}>฿ {commas(price,'2')}</p>
      </div>
    </div>
  );
}
