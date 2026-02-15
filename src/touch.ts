"use client";

import {useEffect, useState} from 'react';

const getIsTouchDevice = (): boolean => {
    if (typeof window === "undefined") {
        return false;
    }
    const hasTouchEvent = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

    return hasTouchEvent || hasTouchPoints || hasCoarsePointer;
};

export function TouchDevice(): boolean {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(() => getIsTouchDevice());
    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: coarse)");

        const handleChange =() => {
            setIsTouchDevice(getIsTouchDevice());
        };

        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return isTouchDevice;
}