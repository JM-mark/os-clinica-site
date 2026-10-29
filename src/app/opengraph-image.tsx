import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OS Clínica — Odontologia Integrada em Valinhos/SP";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F7F5F1", color: "#14181B" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "#BBBEAA", color: "#2B3326", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>OS</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, color: "#3F4A38" }}>OS Clínica</span>
            <span style={{ fontSize: 16, letterSpacing: 4, color: "#5B6259" }}>ODONTOLOGIA INTEGRADA</span>
          </div>
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.08, maxWidth: 980, color: "#2B3326" }}>
          Odontologia integrada, do cuidado preventivo ao sorriso que você quer ter.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#5B6259" }}>
          <div style={{ width: 48, height: 2, background: "#C8A97E" }} /> Valinhos/SP
        </div>
      </div>
    ),
    size,
  );
}
