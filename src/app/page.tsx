"use client";

import { useState }  from "react";
import Images from "@/images.json";
import { InfiniteCanvas } from "@/components/Landing";
import type { MediaItem } from "@/components/Landing/types";
import { PageLoader } from "@/components/Preloader";

export default function App() {
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