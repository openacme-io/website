"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 48, fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Something went wrong</h1>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 16,
            padding: "10px 16px",
            background: "#1a1a1e",
            color: "#fcfaf7",
            border: 0,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
