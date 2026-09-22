import React from "react";

/** Static ambient gradient. Also shown behind the canvas and when WebGL is unavailable. */
export default function FallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--bg)]">
      <div className="absolute -top-[20%] right-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.10)_0%,transparent_60%)]" />
      <div className="absolute bottom-[-30%] left-[-15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.08)_0%,transparent_60%)]" />
    </div>
  );
}
