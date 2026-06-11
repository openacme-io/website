/* eslint-disable @next/next/no-img-element */

/* ---------- Inline SVG icon set (monoline, 20–24px, currentColor) ---------- */

const IconHex = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2 21 7v10l-9 5-9-5V7l9-5z" />
  </svg>
);

const IconBolt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

const IconClipboard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 10h6M9 14h6M9 18h4" />
  </svg>
);

const IconPersonCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 19a6 6 0 0 1 11 0" />
  </svg>
);

const IconBook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4z" />
    <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7V4z" />
  </svg>
);

const IconGitBranch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="9" r="2" />
    <path d="M6 7v10" />
    <path d="M18 11c0 4-6 4-6 8" />
  </svg>
);

const IconClockHistory = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
    <path d="M12 8v4l3 2" />
  </svg>
);

/* ---------- Reusable: video tile with fallback ---------- */

function VideoTile({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "16 / 9",
        background: "var(--bg-surface)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Fallback rendered behind the video; visible only if the <video> fails to paint */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div style={{ color: "var(--color-accent)", fontSize: 15, fontWeight: 600 }}>▶ Demo video</div>
        <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>Recording in progress</div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  return (
    <>
      {/* ============ NAV ============ */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(10,15,30,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6" style={{ height: 56 }}>
          <a href="#" className="flex items-center gap-2.5" aria-label="OpenAcme home" style={{ color: "var(--text-primary)" }}>
            <img
              src="/logo-mark-dark.svg"
              alt=""
              width={28}
              height={28}
            />
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>OpenAcme</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <a href="#features" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }} className="transition-colors duration-150 hover:text-[color:var(--text-primary)]">Features</a>
            <a href="#use-cases" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }} className="transition-colors duration-150 hover:text-[color:var(--text-primary)]">Use Cases</a>
          </nav>
          <a
            href="#cta"
            className="inline-flex items-center rounded-lg transition-opacity duration-150 hover:opacity-90"
            style={{
              background: "var(--color-accent)",
              color: "#0f1729",
              fontSize: 14,
              fontWeight: 600,
              padding: "8px 16px",
            }}
          >
            <span className="hidden md:inline">Get Started</span>
            <span className="md:hidden" style={{ fontSize: 13, padding: "0 2px" }}>Get Started</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:pt-20 lg:pb-16">
            <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr]">
              {/* Text column */}
              <div>
                <span
                  className="inline-block rounded-full"
                  style={{
                    background: "rgba(34,211,238,0.12)",
                    border: "1px solid rgba(34,211,238,0.25)",
                    color: "var(--color-accent)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                  }}
                >
                  Now in public beta
                </span>

                <h1
                  className="mt-5"
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    maxWidth: 600,
                  }}
                >
                  <span className="block" style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.1 }}>
                    Run a 5-person AI team
                  </span>
                  <span className="block" style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.1 }}>
                    with one operator.
                  </span>
                </h1>

                <p
                  className="mt-5"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "clamp(16px, 1.5vw, 18px)",
                    lineHeight: 1.6,
                    maxWidth: 520,
                  }}
                >
                  OpenAcme gives each agent a role, memory, and tools — they coordinate, hand off work, and ship. You review results, not steps.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#cta"
                    className="inline-flex items-center justify-center rounded-xl transition-opacity duration-150 hover:opacity-90"
                    style={{
                      background: "var(--color-accent)",
                      color: "#0f1729",
                      fontWeight: 700,
                      fontSize: 16,
                      padding: "14px 28px",
                    }}
                  >
                    Request Early Access →
                  </a>
                  <a
                    href="#use-cases"
                    className="inline-flex items-center justify-center rounded-xl transition-colors duration-150"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(34,211,238,0.35)",
                      color: "var(--color-accent)",
                      fontWeight: 600,
                      fontSize: 16,
                      padding: "13px 28px",
                    }}
                  >
                    Watch the demo ↓
                  </a>
                </div>
              </div>

              {/* Task-board mockup (right column, desktop only) */}
              <div className="hidden lg:block">
                <div
                  className="w-full"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid #1e3a6e",
                    borderRadius: 16,
                    padding: 20,
                    maxWidth: 560,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Mock header row */}
                  <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                    <div className="flex items-center gap-2">
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Task Board
                    </span>
                  </div>
                  {/* Mock task rows */}
                  <ul className="flex flex-col" style={{ gap: 10 }}>
                    {[
                      { agent: "manager", title: "Decompose: ship pricing page", status: "done" },
                      { agent: "designer", title: "Spec: pricing layout + tokens", status: "done" },
                      { agent: "builder", title: "Implement /pricing", status: "running" },
                      { agent: "deployer", title: "Deploy to Vercel", status: "queued" },
                    ].map((row, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: 10,
                          padding: "10px 14px",
                        }}
                      >
                        <div className="flex items-center" style={{ gap: 12, minWidth: 0 }}>
                          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", width: 76, flexShrink: 0 }}>
                            @{row.agent}
                          </span>
                          <span style={{ fontSize: 13, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {row.title}
                          </span>
                        </div>
                        <StatusBadge status={row.status as "done" | "running" | "queued"} />
                      </li>
                    ))}
                  </ul>
                  {/* Mock footer */}
                  <div className="flex items-center justify-between" style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ color: "var(--text-faint)", fontSize: 12 }}>4 tasks · 1 running</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 12 }}>updated just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROOF BAR ============ */}
        <section
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="mx-auto max-w-[1280px] px-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <ul className="flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center sm:gap-12">
              {[
                { icon: <IconHex width={16} height={16} />, label: "Open source core" },
                { icon: <IconBolt width={16} height={16} />, label: "Ships to Vercel in under 2 minutes" },
                { icon: <IconClipboard width={16} height={16} />, label: "Full task-graph audit trail" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span style={{ color: "var(--color-accent)" }}>{item.icon}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" style={{ background: "var(--bg-elevated)" }}>
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-[640px] text-center">
              <div style={{ color: "var(--color-accent)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                How it works
              </div>
              <h2
                className="mt-3"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(32px, 4vw, 40px)",
                  lineHeight: 1.2,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                One platform. A full specialist team.
              </h2>
              <p className="mt-4" style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.6 }}>
                Each agent owns its domain. The task graph wires them together. You stay in the loop only when a decision matters.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <FeatureCard icon={<IconPersonCircle width={20} height={20} />} title="Role-specialized agents">
                Each agent has a defined role — manager, builder, designer, deployer. They pick up tasks in their domain and hand off when done. No cross-talk, no dropped balls.
              </FeatureCard>
              <FeatureCard icon={<IconBook width={20} height={20} />} title="On-demand skill loading">
                Agents load skills only when needed — coding conventions, platform guides, deployment checklists. Zero prompt bloat. Add a new capability by dropping in a file.
              </FeatureCard>
              <FeatureCard icon={<IconGitBranch width={20} height={20} />} title="Dependency-aware task graph">
                Tasks declare what they depend on. The scheduler unblocks them automatically when deps resolve. Work flows at the right speed — parallel where possible, sequential where required.
              </FeatureCard>
              <FeatureCard icon={<IconClockHistory width={20} height={20} />} title="Persistent memory + full audit trail">
                Every decision, comment, and handoff is logged. Agents remember past context. The worklog gives you a timestamped record of everything the team shipped — no black boxes.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* ============ USE CASES ============ */}
        <section id="use-cases" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-[1280px] px-6 py-24">
            <div className="mx-auto max-w-[640px] text-center">
              <div style={{ color: "var(--color-accent)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Real workflows
              </div>
              <h2
                className="mt-3"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(32px, 4vw, 40px)",
                  lineHeight: 1.2,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                What your AI team ships.
              </h2>
            </div>

            <div className="mt-16 flex flex-col" style={{ gap: 80 }}>
              <UseCase
                number="01"
                accent="var(--color-accent)"
                heading="Build and deploy a full website — while you watch."
                before="Hours of scaffolding, component work, and deploy configuration."
                after="One goal typed in plain English. Manager decomposes it, builder implements, deployer ships. Live URL in minutes."
                video="/videos/demo-website-build.mp4"
                videoLabel="OpenAcme building and deploying a website"
                reverse={false}
              />
              <UseCase
                number="02"
                accent="var(--color-uc2)"
                heading="Every pull request reviewed before it touches main."
                before="Review backlogs that slow down merges and miss regressions."
                after="Reviewer agent reads the diff, checks conventions, flags issues, routes fixes back. Merge with confidence."
                video="/videos/demo-code-review.mp4"
                videoLabel="OpenAcme reviewing a pull request"
                reverse={true}
              />
              <UseCase
                number="03"
                accent="var(--color-uc3)"
                heading="Multi-step data pipelines that run themselves."
                before="Manual handoffs between ingest, transform, validate, and report stages."
                after="Each stage owned by a dedicated agent. Failures route to the right specialist automatically. Data arrives clean, on schedule."
                video="/videos/demo-data-pipeline.mp4"
                videoLabel="OpenAcme running a multi-step data pipeline"
                reverse={false}
              />
            </div>
          </div>
        </section>

        {/* ============ CTA BANNER ============ */}
        <section
          id="cta"
          style={{
            background: "var(--bg-base)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div className="mx-auto max-w-[640px] px-6 py-24 text-center">
            <div className="flex justify-center" style={{ color: "var(--text-primary)" }}>
              <img src="/logo-mark-dark.svg" alt="" width={32} height={32} />
            </div>
            <h2
              className="mt-5"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(32px, 4.5vw, 44px)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Your AI workforce is one command away.
            </h2>
            <p className="mt-4" style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.6 }}>
              No infrastructure. No prompt engineering. Just define the goal — OpenAcme routes it, works it, and ships it.
            </p>
            <div className="mt-9 flex justify-center">
              <a
                href="https://github.com/sandydasari/openacme"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-xl transition-opacity duration-150 hover:opacity-90"
                style={{
                  background: "var(--color-accent)",
                  color: "#0f1729",
                  fontWeight: 700,
                  fontSize: 17,
                  padding: "16px 32px",
                }}
              >
                Request Early Access →
              </a>
            </div>
            <p className="mt-3" style={{ color: "var(--text-muted)", fontSize: 13 }}>
              No credit card. No infra setup. Just agents.
            </p>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "#070b14", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <a href="#" className="flex items-center gap-2.5" aria-label="OpenAcme home" style={{ color: "var(--text-secondary)" }}>
              <img src="/logo-mark-dark.svg" alt="" width={24} height={24} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>OpenAcme</span>
            </a>
            <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
              <a href="#features" style={{ fontSize: 14, color: "var(--text-muted)" }} className="transition-colors duration-150 hover:text-[color:var(--text-secondary)]">Features</a>
              <a href="#use-cases" style={{ fontSize: 14, color: "var(--text-muted)" }} className="transition-colors duration-150 hover:text-[color:var(--text-secondary)]">Use Cases</a>
              <a href="https://github.com/sandydasari/openacme" target="_blank" rel="noreferrer noopener" style={{ fontSize: 14, color: "var(--text-muted)" }} className="transition-colors duration-150 hover:text-[color:var(--text-secondary)]">Docs</a>
              <a href="#" style={{ fontSize: 14, color: "var(--text-muted)" }} className="transition-colors duration-150 hover:text-[color:var(--text-secondary)]">Privacy</a>
            </nav>
            <span style={{ fontSize: 13, color: "var(--text-faint)" }}>© 2026 OpenAcme, Inc.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- Subcomponents ---------- */

function StatusBadge({ status }: { status: "done" | "running" | "queued" }) {
  const map = {
    done: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "✓ done" },
    running: { bg: "rgba(34,211,238,0.12)", color: "var(--color-accent)", label: "● running" },
    queued: { bg: "rgba(148,163,184,0.12)", color: "var(--text-secondary)", label: "○ queued" },
  } as const;
  const s = map[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "3px 8px",
        borderRadius: 6,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group transition-colors duration-150"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 10,
        padding: 28,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background: "rgba(99,102,241,0.12)",
          borderRadius: 12,
          color: "var(--color-primary)",
        }}
      >
        {icon}
      </div>
      <h3 className="mt-4" style={{ color: "var(--text-primary)", fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>
        {title}
      </h3>
      <p className="mt-2" style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </p>
    </div>
  );
}

function UseCase({
  number,
  accent,
  heading,
  before,
  after,
  video,
  videoLabel,
  reverse,
}: {
  number: string;
  accent: string;
  heading: string;
  before: string;
  after: string;
  video: string;
  videoLabel: string;
  reverse: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
          <div style={{ color: accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {number}
          </div>
          <h3
            className="mt-3"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(22px, 2.4vw, 26px)",
              lineHeight: 1.3,
              fontWeight: 600,
              letterSpacing: "-0.005em",
              maxWidth: 480,
            }}
          >
            {heading}
          </h3>
          <dl className="mt-5 flex flex-col" style={{ gap: 10, maxWidth: 480 }}>
            <div>
              <dt style={{ color: "var(--text-muted)", fontSize: 13, fontWeight: 600 }}>Before:</dt>
              <dd style={{ color: "var(--text-secondary)", fontSize: 15, fontStyle: "italic", lineHeight: 1.6, marginTop: 2 }}>{before}</dd>
            </div>
            <div>
              <dt style={{ color: "var(--text-muted)", fontSize: 13, fontWeight: 600 }}>After:</dt>
              <dd style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.6, marginTop: 2 }}>{after}</dd>
            </div>
          </dl>
        </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <VideoTile src={video} label={videoLabel} />
      </div>
    </div>
  );
}
