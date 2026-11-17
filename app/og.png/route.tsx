import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded 1200x630 card shown when the site link is shared on WhatsApp, Facebook, X or Google.
// Served from a fixed URL (/og.png) so every page can reference it in its Open Graph tags.
const size = { width: 1200, height: 630 };

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public", "logo.jpeg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #1f1a08 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 150, border: "6px solid #eab308", marginRight: 70 }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 28, color: "#eab308", letterSpacing: 4, textTransform: "uppercase" }}>
            Maths Made Easy
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08, marginTop: 14 }}>
            Pathan Tutorials of Mathematics
          </div>
          <div style={{ fontSize: 32, color: "#d4d4d4", marginTop: 26 }}>
            Classes 8th to 12th and MH-CET
          </div>
          <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 8 }}>
            CBSE and State Board, Hinganghat
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
