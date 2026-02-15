"use client";

import { ComponentProps, Suspense, lazy } from "react";

const LazyInfiniteCanvasScene = lazy(() => import("./Scene").then((mod) => ({ default: mod.InfiniteCanvasScene })));

export function InfiniteCanvas(props: ComponentProps<typeof LazyInfiniteCanvasScene>) {
    return (
        <Suspense fallback={null}>
            <LazyInfiniteCanvasScene {...props} />
        </Suspense>
    );
}