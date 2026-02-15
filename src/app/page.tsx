"use client";


import * as React from "react";
import manifest from "";
import { InfiniteCanvas } from "~/src/infinite-canvas";
import type { MediaItem } from "~/src/infinite-canvas/types";
import { PageLoader } from "@/components/Preloader/index";

export function App() {
    const [media] = React.useState<MediaItem[]>(manifest);
    const [textureProgress, setTextureProgress] = React.useState(0);

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