// components/Dropdown.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@styles/dropdown.module.scss";

export default function Dropdown({
    label = "Select",
    options = [],
    value,
    onSelect,
    clearTrigger,     // ⬅️ NEW
    onClear           // ⬅️ NEW (optional)
}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const refDropdown = useRef(null);

    const handleSelect = (item) => {
        setSelected(item);
        setOpen(false);
        if (onSelect) onSelect(item);
    };

    // ตั้งค่า default จาก value
    useEffect(() => {
        if (value !== undefined && options.length > 0) {
            const found = options.find(item => item.value == value);
            setSelected(found || null);
        }
    }, [value, options]);

    // ⬅️ clear dropdown เมื่อ clearTrigger เปลี่ยน
    useEffect(() => {
        if (clearTrigger !== undefined) {
            setSelected(null);
            if (onClear) onClear();
        }
    }, [clearTrigger]);

    // click outside
    useEffect(() => {
        const clickOuter = (e) => {
            if (
                refDropdown.current &&
                !refDropdown.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        window.addEventListener("click", clickOuter);
        return () => window.removeEventListener("click", clickOuter);
    }, []);

    return (
        <div ref={refDropdown} className={styles.dropdown}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(!open)}
            >
                <span className={styles.label}>
                    {selected ? selected.title : label}
                </span>
                <span className={styles.arrow}>▾</span>
            </button>

            {open && (
                <div className={styles.menu}>
                    {options.map((item) => (
                        <div
                            key={item.value}
                            className={styles.item}
                            onClick={() => handleSelect(item)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
