"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

export function PageLoader({ progress }: { progress: number }) {
    const [show, setShow] = useState(true);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const visualRef = useRef(0);
    const [visualProgress, setVisualProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setMinTimeElapsed(true), 1200); // Slightly faster min time
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let raf: number;
        const animate = () => {
            const diff = progress - visualRef.current;
            if (Math.abs(diff) > 0.01) {
                // Smoother easing: slower at the end for a premium feel
                visualRef.current += diff * 0.06;
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
        if (minTimeElapsed && progress >= 100 && visualProgress >= 99.9) {
            const t = setTimeout(() => setShow(false), 600); // Longer delay for exit animation
            return () => clearTimeout(t);
        }
    }, [minTimeElapsed, progress, visualProgress]);

    if (!show) return null;

    const isHidden = minTimeElapsed && progress >= 100 && visualProgress >= 99.9;

    return (
        <div className={`${styles.overlay} ${isHidden ? styles.hidden : styles.visible}`}>
            <div className={styles.content}>
                {/* Minimalist Percentage Counter */}
                <div className={styles.counter}>
                    {Math.round(visualProgress)}%
                </div>

                {/* Ultra-thin loading line */}
                <div className={styles.loaderTrack}>
                    <div
                        className={styles.loaderFill}
                        style={{ transform: `scaleX(${visualProgress / 100})` }}
                    />
                </div>
            </div>
        </div>
    );
}