// components/Loading.jsx
"use client";

import styles from "@styles/loading.module.scss";

export default function Loading({ size = 40, text }) {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.spinner}
        style={{ width: size, height: size }}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
