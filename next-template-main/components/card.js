// components/RealEstateCard.jsx
"use client";

import { useState } from "react";
import styles from "@styles/card.module.scss";

export default function RealEstateCard({
  image,
  title,
  price,
  location,
  initialLike = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLike);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
        <button
          className={`${styles.likeBtn} ${liked ? styles.active : ""}`}
          onClick={handleLike}
        >
          ❤️ {likeCount}
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
