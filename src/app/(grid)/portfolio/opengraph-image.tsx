import { ImageResponse } from "next/og";

export const alt = "Portfolio WEBCODE - Desarrollo Web Profesional";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px"
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              marginBottom: 20,
              background: "linear-gradient(45deg, #ffffff, #e0f2fe)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            PORTFOLIO
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              marginBottom: 15,
              color: "#ffffff"
            }}
          >
            WEBCODE
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#e0f2fe",
              maxWidth: 900,
              lineHeight: 1.4,
              marginBottom: 20
            }}
          >
            Desarrollo Web Profesional en Barcelona
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#bfdbfe",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <span>Next.js</span>
            <span>•</span>
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>E-commerce</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
