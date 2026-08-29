import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3C3C3D",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <g fill="#ffffff">
            <polygon points="16,5 16,13.2 9.5,16.5" opacity={0.85} />
            <polygon points="16,5 22.5,16.5 16,13.2" opacity={0.55} />
            <polygon points="16,14.6 16,20.5 9.5,17.9" opacity={0.85} />
            <polygon points="16,14.6 22.5,17.9 16,20.5" opacity={0.55} />
            <polygon points="16,22 16,27 9.6,19.1" opacity={0.85} />
            <polygon points="16,22 22.4,19.1 16,27" opacity={0.55} />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
