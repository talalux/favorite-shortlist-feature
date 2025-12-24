// components/Dropdown.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@styles/dropdown.module.scss";

export default function Dropdown({ label = "Select", options = [], onSelect }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const refDropdown = useRef()
    const handleSelect = (item) => {
        setSelected(item);
        setOpen(false);
        if (onSelect) onSelect(item);
    };

    useEffect(() => {
        const clickOuter = (e) => {
            if (
            refDropdown.current &&
            !refDropdown.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }
        window.addEventListener("click", clickOuter)
        return () => {
            window.removeEventListener("click", clickOuter);
        };
    }, [])

    return (
        <div ref={refDropdown} className={styles.dropdown}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(!open)}
            >
                <span className={styles.label}>{selected ? selected.title : label}</span>
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
