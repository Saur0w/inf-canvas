"use client";

import { useState, useEffect }  from "react";
import Images from "@/images.json";
import { InfiniteCanvas } from "@/components/Landing";
import type { MediaItem } from "@/components/Landing/types";
import { PageLoader } from "@/components/Preloader";
import Lenis from "lenis";

export default function App() {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        }
    }, []);
    const [media] = useState<MediaItem[]>(Images);
    const [textureProgress, setTextureProgress] = useState(0);

    if (!media.length) {
        return <PageLoader progress={0} />;
    }

    return (
        <>
            <PageLoader progress={textureProgress} />
            <InfiniteCanvas media={media} onTextureProgress={setTextureProgress} />
        </>
    );
}