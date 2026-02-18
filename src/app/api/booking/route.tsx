// app/api/og/route.tsx
import { ImageResponse } from "next/og";

// Using Node.js runtime for database compatibility
export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        background: "white",
        color: "black",
        width: "100%",
        height: "100%",
        display: "flex", // Satori supports flexbox
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      Hello, world!
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
