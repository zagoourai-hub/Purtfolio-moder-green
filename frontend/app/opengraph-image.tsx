import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Alex Zagoour — Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #09090b, #18181b, #09090b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "80px",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.15)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(168, 85, 247, 0.15)",
            filter: "blur(100px)",
          }}
        />

        {/* Outer Border */}
        <div
          style={{
            position: "absolute",
            inset: "30px",
            border: "1px solid rgba(63, 63, 70, 0.4)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {/* Logo Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "#ffffff",
              color: "#09090b",
              fontSize: "48px",
              fontWeight: "900",
              boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
            }}
          >
            Z
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "-2px",
              marginTop: "16px",
            }}
          >
            Alex Zagoour
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              maxWidth: "700px",
              lineHeight: "1.4",
              fontWeight: "300",
            }}
          >
            Building premium digital experiences with Next.js 16, NestJS, and interactive UI animations.
          </div>

          {/* Badges footer */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                background: "rgba(39, 39, 42, 0.8)",
                border: "1px solid rgba(63, 63, 70, 0.6)",
                borderRadius: "8px",
                color: "#e4e4e7",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              Fullstack Architect
            </div>
            <div
              style={{
                padding: "8px 16px",
                background: "rgba(39, 39, 42, 0.8)",
                border: "1px solid rgba(63, 63, 70, 0.6)",
                borderRadius: "8px",
                color: "#e4e4e7",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              Next.js 16
            </div>
            <div
              style={{
                padding: "8px 16px",
                background: "rgba(39, 39, 42, 0.8)",
                border: "1px solid rgba(63, 63, 70, 0.6)",
                borderRadius: "8px",
                color: "#e4e4e7",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              Tailwind v4
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
