"use client";

import styles from "./style.module.scss";
import React, { useState, useEffect, useRef } from "react";

export function Preloader({ progress }: { progress: number}) {
    const [show, setShow] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed]= useState(false);
    const visualRef = useRef(0);
    const [visualProgress, setVisualProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setMinTimeElapsed(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let raf: number;

        const animate =() => {
            const diff = progress - visualRef.current;

            if (diff > 0.1) {
                visualRef.current += diff * 0.08;
                setVisualProgress(visualRef.current);
                raf = requestAnimationFrame(animate);
            } else {
                visualRef.current = progress;
                setVisualProgress(progress);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [progress]);

    useEffect(() => {
        if  (minTimeElapsed && progress === 100 && visualProgress >= 99.5) {
            const t = setTimeout(() => setShow(false), 200);
            return () => clearTimeout(t);
        }
    }, [minTimeElapsed, progress, visualProgress]);

    if (!show) {
        return null;
    }

    const isHidden = minTimeElapsed && progress === 100 && visualProgress >= 99.5;
    return (
        <div className={`${styles.overlay} ${isHidden ? styles.hidden : styles.visible}`}>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBarFill} />
            </div>
        </div>
    );
}