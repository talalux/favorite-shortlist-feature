// components/NoData.jsx
"use client";

import styles from "@styles/no-data.module.scss";

export default function NoData({
  text = "ไม่พบข้อมูล",
  description,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>📭</div>
      <h3 className={styles.title}>{text}</h3>
      {description && (
        <p className={styles.desc}>{description}</p>
      )}
    </div>
  );
}
