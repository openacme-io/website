export default function NotFound() {
  return (
    <main style={{ padding: 48, fontFamily: "var(--font-sans)" }}>
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>404</h1>
      <p style={{ marginTop: 12, color: "var(--ink-soft)" }}>Page not found.</p>
      <p style={{ marginTop: 12 }}>
        <a href="/" style={{ color: "var(--ink)", textDecoration: "underline" }}>
          Back to home
        </a>
      </p>
    </main>
  );
}
