export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0f1729", color: "#f0f4ff" }}>
      {/* ── NAV ── */}
      <header style={{ background: "#0f1729", borderBottom: "1px solid #1e2d4a" }}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl" style={{ color: "#22d3ee" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#22d3ee" />
              <path d="M7 14 L14 7 L21 14 L14 21 Z" fill="#0f1729" />
            </svg>
            OpenAcme
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "#94a3b8" }}>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
            <li>
              <a
                href="#cta"
                className="px-4 py-2 rounded-lg font-semibold transition-colors"
                style={{ background: "#22d3ee", color: "#0f1729" }}
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative overflow-hidden py-28 px-6"
          style={{
            background: "linear-gradient(135deg, #0f1729 0%, #162347 60%, #0e2340 100%)",
          }}
        >
          {/* decorative glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,211,238,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.3)" }}
            >
              Now in public beta
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6" style={{ color: "#f0f4ff" }}>
              The AI Workforce{" "}
              <span style={{ color: "#22d3ee" }}>Platform</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
              Coordinate specialized AI agents, automate complex workflows, and
              ship production-ready results — without writing a single line of
              orchestration code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cta"
                className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "#22d3ee", color: "#0f1729" }}
              >
                Get Started — Free
              </a>
              <a
                href="#use-cases"
                className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-80"
                style={{ border: "1px solid rgba(34,211,238,0.4)", color: "#22d3ee" }}
              >
                See Demo ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-24 px-6" style={{ background: "#111827" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>
                Everything your AI team needs
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
                One platform to build, coordinate, and deploy intelligent
                multi-agent workflows at any scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "#162347", border: "1px solid #1e3a6e" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(34,211,238,0.15)" }}>
                  🤝
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#f0f4ff" }}>
                  Multi-Agent Coordination
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  Route tasks across specialized agents automatically. Each
                  agent owns its domain; the platform wires them together.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "#162347", border: "1px solid #1e3a6e" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(34,211,238,0.15)" }}>
                  📚
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#f0f4ff" }}>
                  Skill Library
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  Agents pick up reusable skills on demand — no prompt
                  bloat. Add new capabilities by dropping in a skill file.
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "#162347", border: "1px solid #1e3a6e" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(34,211,238,0.15)" }}>
                  ⚡
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#f0f4ff" }}>
                  Intelligent Task Routing
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  Dependency-aware task graph with automatic unblocking.
                  Work flows to the right agent at the right time.
                </p>
              </div>

              {/* Card 4 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "#162347", border: "1px solid #1e3a6e" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(34,211,238,0.15)" }}>
                  🚀
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#f0f4ff" }}>
                  Live Deployments
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  Agents build and ship to production directly. Vercel,
                  GitHub, Slack — integrate the tools your team already uses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section
          id="use-cases"
          className="py-24 px-6"
          style={{ background: "linear-gradient(180deg, #0f1729 0%, #111827 100%)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0f4ff" }}>
                See it in action
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
                Real workflows, real results — watch how OpenAcme handles your
                most demanding automation challenges.
              </p>
            </div>

            <div className="flex flex-col gap-16">
              {/* Use Case 1 */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 min-w-0">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
                    style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.3)" }}
                  >
                    Use case 01
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
                    Build &amp; deploy a website in minutes
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                    Describe your site, and OpenAcme&apos;s agent team handles the
                    rest — scaffolding Next.js, writing components, running
                    builds, and shipping to Vercel automatically. Zero manual
                    steps from idea to live URL.
                  </p>
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      border: "1px solid #1e3a6e",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Build & deploy a website with OpenAcme"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Use Case 2 */}
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
                <div className="flex-1 min-w-0">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}
                  >
                    Use case 02
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
                    Automate code review workflows
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                    A reviewer agent reads every pull request, checks
                    conventions, flags regressions, and routes fixes back to
                    the author — all without a human in the loop. Merge with
                    confidence.
                  </p>
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      border: "1px solid #1e3a6e",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/ScMzIvxBSi4"
                      title="Automate code review with OpenAcme"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Use Case 3 */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 min-w-0">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
                    style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    Use case 03
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
                    Coordinate multi-step data pipelines
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                    Ingest, transform, validate, and report — each stage owned
                    by a dedicated agent. Failures route to the right specialist
                    automatically. Your data arrives clean, on time, every time.
                  </p>
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      border: "1px solid #1e3a6e",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/QH2-TGUlwu4"
                      title="Multi-step data pipelines with OpenAcme"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          id="cta"
          className="py-24 px-6 text-center"
          style={{
            background: "linear-gradient(135deg, #162347 0%, #0e2340 100%)",
            borderTop: "1px solid #1e3a6e",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <div
              aria-hidden="true"
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
              style={{ background: "rgba(34,211,238,0.15)" }}
            >
              🤖
            </div>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: "#f0f4ff" }}>
              Ready to put your team to work?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#94a3b8" }}>
              Join the teams already shipping faster with OpenAcme. Set up your
              first agent workflow in under five minutes.
            </p>
            <a
              href="#"
              className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "#22d3ee", color: "#0f1729" }}
            >
              Sign Up Free →
            </a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0f1e", borderTop: "1px solid #1e2d4a" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#64748b" }}>
          <div className="flex items-center gap-2 font-bold" style={{ color: "#22d3ee" }}>
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#22d3ee" />
              <path d="M7 14 L14 7 L21 14 L14 21 Z" fill="#0f1729" />
            </svg>
            OpenAcme
          </div>
          <nav className="flex gap-6">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </nav>
          <p>© {new Date().getFullYear()} OpenAcme, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
