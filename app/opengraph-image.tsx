import { ImageResponse } from "next/og";

export const alt = "BUY OR PASS — The Pokémon Card Decision System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated from the same design tokens as the site.
 * Original artwork only — no card images, logos or characters.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #08090b 30%, #14181d 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#f4f5f7",
            fontWeight: 700,
          }}
        >
          BUY <span style={{ color: "#f0b23e", padding: "0 10px" }}>OR</span>{" "}
          PASS
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.05,
              color: "#f4f5f7",
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            Know When to Buy.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.05,
              color: "#9aa1ad",
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            And When to Pass.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#9aa1ad",
          }}
        >
          <span
            style={{
              display: "flex",
              border: "1px solid rgba(240,178,62,0.4)",
              color: "#f0b23e",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            The Pokémon Card Decision System
          </span>
          <span style={{ display: "flex" }}>
            Price · Demand · Scarcity · Liquidity · Grade
          </span>
        </div>
      </div>
    ),
    size,
  );
}
