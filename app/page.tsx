"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INSTALL_COMMANDS = {
  npm: "npx openacme@latest init",
  pnpm: "pnpm dlx openacme@latest init",
  bun: "bunx openacme@latest init",
} as const;

type Tab = keyof typeof INSTALL_COMMANDS;

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        maxWidth: 1200,
        marginInline: "auto",
        paddingInline: "clamp(20px, 4vw, 48px)",
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 64,
        background: "rgba(20,20,19,0.78)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
        transition: "border-color 150ms var(--ease-out-quart)",
      }}
    >
      <Container>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-5)",
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              color: "var(--ink-primary)",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-dark.svg" alt="" height={28} style={{ height: 28, width: "auto", display: "block" }} />
            <span
              style={{
                fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "-0.01em",
              }}
            >
              OpenAcme
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
            <a
              href="https://github.com/sandydasari/openacme#readme"
              className="nav-docs"
              style={{ color: "var(--ink-secondary)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
            >
              Docs
            </a>
            <a
              href="https://github.com/sandydasari/openacme"
              style={{ color: "var(--ink-secondary)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
            >
              GitHub ↗
            </a>
            <a
              href="#install"
              style={{
                background: "var(--ink-primary)",
                color: "var(--bg-base)",
                fontSize: 14,
                fontWeight: 500,
                padding: "8px 18px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
                height: 28,
                transition: "opacity 150ms var(--ease-out-quart)",
              }}
            >
              Install
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function TerminalBlock({ idSuffix }: { idSuffix: string }) {
  const [tab, setTab] = useState<Tab>("npm");
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  const command = INSTALL_COMMANDS[tab];

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }, [command]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      aria-label={`Install command: ${command}`}
      style={{
        maxWidth: 720,
        marginInline: "auto",
        width: "100%",
        border: "1px solid var(--hairline-strong)",
        borderRadius: "var(--radius-block)",
        overflow: "hidden",
        background: "var(--bg-base)",
        textAlign: "left",
      }}
    >
      <div
        style={{
          height: 36,
          background: "var(--bg-elevated)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "var(--space-4)",
        }}
      >
        <div role="tablist" style={{ display: "flex", gap: "var(--space-4)" }}>
          {(Object.keys(INSTALL_COMMANDS) as Tab[]).map((t) => (
            <button
              key={t}
              id={`tab-${t}-${idSuffix}`}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 13,
                fontWeight: 500,
                color: tab === t ? "var(--ink-primary)" : "var(--ink-muted)",
                transition: "color 150ms var(--ease-out-quart)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            color: "var(--ink-secondary)",
            fontSize: 13,
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 150ms var(--ease-out-quart)",
          }}
        >
          <span aria-hidden="true">⧉</span>
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div
        role="tabpanel"
        style={{
          background: "var(--bg-surface)",
          padding: "var(--space-5) var(--space-6)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
          overflowX: "auto",
        }}
      >
        <span style={{ color: "var(--ink-muted)" }}>$&nbsp;</span>
        <span style={{ color: "var(--ink-primary)" }}>{command}</span>
      </div>
    </div>
  );
}

function ChromaticMoment() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 520,
        height: "140%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-260 -280 520 560"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", mixBlendMode: "screen" }}
      >
        {[-120, 0, 120].map((x, i) => (
          <ellipse
            key={x}
            cx={x}
            cy={0}
            rx={36}
            ry={240}
            fill="#d97757"
            opacity={0.7}
            style={{
              transformOrigin: "center",
              animation: `arc-drift 6s ease-in-out ${i * 1.5}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section
      style={{
        paddingBlock: "clamp(96px, 12vw, 168px) clamp(64px, 8vw, 112px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <div style={{ position: "relative", maxWidth: 880, marginInline: "auto", textAlign: "center" }}>
          <div style={{ position: "relative" }}>
            <ChromaticMoment />
            <h1
              style={{
                position: "relative",
                zIndex: 1,
                margin: 0,
                fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 0.98,
                mixBlendMode: "difference",
                color: "var(--ink-primary)",
              }}
            >
              Run a 5-person AI team with one operator.
            </h1>
          </div>

          <p
            style={{
              marginTop: "var(--space-6)",
              marginInline: "auto",
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ink-secondary)",
              fontWeight: 400,
            }}
          >
            OpenAcme gives each agent a role, memory, and tools. They coordinate, hand off, and ship. You review results — not steps.
          </p>

          <div
            style={{
              marginTop: "var(--space-7)",
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#install"
              style={{
                background: "var(--ink-primary)",
                color: "var(--bg-base)",
                fontSize: 16,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                lineHeight: 1,
                transition: "opacity 150ms var(--ease-out-quart)",
              }}
            >
              Install
            </a>
            <a
              href="https://github.com/sandydasari/openacme#readme"
              style={{
                background: "transparent",
                color: "var(--ink-secondary)",
                border: "1px solid var(--hairline-strong)",
                fontSize: 16,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: "var(--radius-card)",
                textDecoration: "none",
                lineHeight: 1,
                transition: "border-color 150ms var(--ease-out-quart), color 150ms var(--ease-out-quart)",
              }}
            >
              Read the docs
            </a>
          </div>

          <div id="install" style={{ marginTop: "var(--space-8)" }}>
            <TerminalBlock idSuffix="hero" />
          </div>
        </div>
      </Container>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Define a goal", body: 'Type one sentence: "Ship a pricing page by Friday."' },
  { n: "02", title: "Watch the team plan", body: "Manager decomposes. Builder builds. Designer reviews. Deployer ships." },
  { n: "03", title: "Review what shipped", body: "You see a working URL — and the full audit trail of how it got there." },
];

function HowItWorks() {
  return (
    <section style={{ paddingBlock: "var(--space-10)" }}>
      <Container>
        <h2
          style={{
            margin: "0 auto var(--space-8)",
            maxWidth: 720,
            textAlign: "center",
            fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "var(--ink-primary)",
          }}
        >
          How a team ships.
        </h2>
        <div style={{ borderTop: "1px solid var(--hairline)" }}>
          {STEPS.map((step) => (
            <div
              key={step.n}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: "var(--space-5)",
                paddingBlock: "var(--space-6)",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 14, fontWeight: 500, color: "var(--ink-muted)" }}>
                {step.n}
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "var(--space-2)",
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--ink-primary)",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ margin: 0, maxWidth: "56ch", fontSize: 16, lineHeight: 1.55, color: "var(--ink-secondary)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

type Status = "done" | "running" | "queued" | "waiting";

function StatusBadge({ kind }: { kind: Status }) {
  const map = {
    done: { glyph: "✓", label: "done", glyphColor: "var(--ink-primary)", labelColor: "var(--ink-secondary)" },
    running: { glyph: "●", label: "run", glyphColor: "var(--accent-glow)", labelColor: "var(--ink-secondary)" },
    queued: { glyph: "○", label: "queue", glyphColor: "var(--ink-muted)", labelColor: "var(--ink-muted)" },
    waiting: { glyph: "○", label: "wait", glyphColor: "var(--ink-muted)", labelColor: "var(--ink-muted)" },
  }[kind];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-chip)",
        padding: "2px 8px",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 12,
        lineHeight: 1.4,
      }}
    >
      <span style={{ color: map.glyphColor, fontSize: 12, lineHeight: 1 }}>{map.glyph}</span>
      <span style={{ color: map.labelColor }}>{map.label}</span>
    </span>
  );
}

function MockupFrame({ header, right, children }: { header: string; right: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        background: "var(--bg-surface)",
        border: "1px solid var(--hairline-strong)",
        borderRadius: "var(--radius-block)",
      }}
    >
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "var(--space-5)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          {header}
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            color: "var(--ink-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {right}
        </span>
      </div>
      {children}
    </div>
  );
}

const TASK_ROWS: { agent: string; title: string; status: Status }[] = [
  { agent: "@manager", title: "Decompose: ship pricing page", status: "done" },
  { agent: "@designer", title: "Spec: pricing layout + tokens", status: "done" },
  { agent: "@builder", title: "Implement /pricing", status: "running" },
  { agent: "@deployer", title: "Deploy to Vercel", status: "queued" },
];

function TaskBoardMockup() {
  return (
    <MockupFrame
      header="Task Board"
      right={
        <>
          <span>4 tasks · 1</span>
          <span style={{ color: "var(--accent-glow)" }}>●</span>
        </>
      }
    >
      <div>
        {TASK_ROWS.map((row, i) => (
          <div
            key={row.title}
            style={{
              minHeight: 56,
              display: "grid",
              gridTemplateColumns: "minmax(0, 120px) minmax(0, 1fr) minmax(0, auto)",
              alignItems: "center",
              gap: "var(--space-4)",
              paddingInline: "var(--space-5)",
              paddingBlock: "var(--space-3)",
              borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
            }}
          >
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "var(--ink-muted)" }}>
              {row.agent}
            </span>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-primary)" }}>{row.title}</span>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              <StatusBadge kind={row.status} />
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function ReviewThreadMockup() {
  return (
    <MockupFrame header="Pull Request" right={<StatusBadge kind="running" />}>
      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "var(--ink-muted)" }}>#142</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-primary)" }}>Add /pricing route</span>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "var(--ink-muted)", marginBottom: "var(--space-2)" }}>
            @reviewer · 2 min ago
          </div>
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-block)",
              padding: "var(--space-4)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--ink-primary)",
            }}
          >
            4 changes look right. One nit: the Pro tier card uses <span className="mono">rgba(...)</span> instead of <span className="mono">var(--accent)</span>. Mind fixing?
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "var(--ink-muted)", marginBottom: "var(--space-2)" }}>
            @builder · just now
          </div>
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-block)",
              padding: "var(--space-4)",
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--ink-primary)",
            }}
          >
            Fixed. Pushed as <span className="mono">e3a4f9</span>.
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

const PIPELINE_ROWS: { agent: string; cadence: string; last: string; status: Status }[] = [
  { agent: "@ingest", cadence: "every 4h", last: "last ran 2m ago", status: "done" },
  { agent: "@transform", cadence: "every 4h", last: "last ran 1m ago", status: "running" },
  { agent: "@publish", cadence: "daily 09:00", last: "last ran 18h ago", status: "waiting" },
];

function ScheduledRunsMockup() {
  return (
    <MockupFrame header="Scheduled Runs" right={<span>3 active</span>}>
      <div>
        {PIPELINE_ROWS.map((row, i) => (
          <div
            key={row.agent}
            style={{
              minHeight: 56,
              display: "grid",
              gridTemplateColumns: "minmax(0, 110px) minmax(0, 1fr) minmax(0, 1fr) minmax(0, auto)",
              alignItems: "center",
              gap: "var(--space-4)",
              paddingInline: "var(--space-5)",
              paddingBlock: "var(--space-3)",
              borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
            }}
          >
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "var(--ink-muted)" }}>
              {row.agent}
            </span>
            <span style={{ fontSize: 14, color: "var(--ink-secondary)" }}>{row.cadence}</span>
            <span style={{ fontSize: 14, color: "var(--ink-secondary)" }}>{row.last}</span>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              <StatusBadge kind={row.status} />
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function UseCase({
  kicker,
  title,
  body,
  videoSrc,
  videoLabel,
  mockup,
  textFirst,
}: {
  kicker: string;
  title: string;
  body: string;
  videoSrc: string;
  videoLabel: string;
  mockup: React.ReactNode;
  textFirst: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  return (
    <div>
      <div className={`use-case-row ${textFirst ? "text-first" : "mockup-first"}`}>
        <div className="use-case-text">
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--ink-muted)",
              marginBottom: "var(--space-2)",
            }}
          >
            {kicker}
          </div>
          <h3
            style={{
              margin: 0,
              marginBottom: "var(--space-4)",
              fontSize: "clamp(1.375rem, 1.2vw + 1rem, 1.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--ink-primary)",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              marginBottom: "var(--space-5)",
              maxWidth: "52ch",
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--ink-secondary)",
            }}
          >
            {body}
          </p>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px 0",
              cursor: "pointer",
              color: open ? "var(--ink-primary)" : "var(--ink-secondary)",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 150ms var(--ease-out-quart)",
            }}
          >
            {open ? "Hide the full run ↑" : "Watch the full run →"}
          </button>
        </div>
        <div className="use-case-mockup" style={{ minWidth: 0 }}>
          {mockup}
        </div>
      </div>
      {open && (
        <div style={{ marginTop: "var(--space-6)" }}>
          {videoError ? (
            <div
              style={{
                maxWidth: 720,
                marginInline: "auto",
                border: "1px solid var(--hairline-strong)",
                borderRadius: 0,
                padding: "var(--space-6)",
                fontSize: 14,
                color: "var(--ink-muted)",
                textAlign: "center",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              Video unavailable.
            </div>
          ) : (
            <video
              src={videoSrc}
              aria-label={videoLabel}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              style={{
                display: "block",
                maxWidth: 720,
                width: "100%",
                marginInline: "auto",
                border: "1px solid var(--hairline-strong)",
                borderRadius: 0,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function UseCases() {
  return (
    <section style={{ paddingBlock: "var(--space-10)" }}>
      <Container>
        <h2
          style={{
            margin: "0 auto var(--space-9)",
            maxWidth: 720,
            textAlign: "center",
            fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "var(--ink-primary)",
          }}
        >
          What your AI team ships.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
          <UseCase
            kicker="01"
            title="Build and ship a website while you watch."
            body="One goal in. Manager decomposes the brief, builder implements, designer reviews, deployer ships to Vercel. The URL is live in minutes."
            videoSrc="/videos/demo-website-build.mp4"
            videoLabel="Website build demo"
            mockup={<TaskBoardMockup />}
            textFirst
          />
          <UseCase
            kicker="02"
            title="Every pull request reviewed before it touches main."
            body="Reviewer agent reads the diff, checks conventions, flags issues, routes fixes back. Merge with confidence."
            videoSrc="/videos/demo-code-review.mp4"
            videoLabel="Code review demo"
            mockup={<ReviewThreadMockup />}
            textFirst={false}
          />
          <UseCase
            kicker="03"
            title="Multi-step pipelines that run themselves."
            body="Each stage owned by a dedicated agent. Failures route to the right specialist automatically. Data arrives clean, on schedule."
            videoSrc="/videos/demo-data-pipeline.mp4"
            videoLabel="Data pipeline demo"
            mockup={<ScheduledRunsMockup />}
            textFirst
          />
        </div>
      </Container>
    </section>
  );
}

const FEATURES = [
  { title: "Role-specialized agents", body: "Manager / Builder / Designer / Deployer. Each owns a domain." },
  { title: "On-demand skill loading", body: "Agents load capabilities only when needed. No prompt bloat." },
  { title: "Dependency-aware task graph", body: "Tasks declare deps. The scheduler unblocks them automatically." },
  { title: "Persistent memory + full audit trail", body: "Every decision logged. Agents remember. No black boxes." },
];

function Features() {
  return (
    <section style={{ paddingBlock: "var(--space-10)" }}>
      <Container>
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "var(--ink-secondary)",
            marginBottom: "var(--space-6)",
          }}
        >
          Built for operators.
        </div>
        <div style={{ borderTop: "1px solid var(--hairline)" }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                paddingBlock: "var(--space-5)",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: "var(--space-2)",
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--ink-primary)",
                }}
              >
                {f.title}
              </h3>
              <p style={{ margin: 0, maxWidth: "65ch", fontSize: 16, lineHeight: 1.55, color: "var(--ink-secondary)" }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const COMMITS = [
  { hash: "e3a4f9", author: "builder", verb: "fix(pricing):", rest: "use var(--accent)", time: "2m" },
  { hash: "b71c20", author: "reviewer", verb: "review:", rest: "4 changes, 1 nit", time: "8m" },
  { hash: "a1f330", author: "builder", verb: "feat(pricing):", rest: "add Pro tier card", time: "14m" },
  { hash: "9c2b88", author: "designer", verb: "spec:", rest: "pricing layout + tokens", time: "32m" },
  { hash: "7e4d11", author: "manager", verb: "decompose:", rest: "ship pricing page", time: "1h" },
];

function Proof() {
  return (
    <section style={{ paddingBlock: "var(--space-10)" }}>
      <Container>
        <div style={{ maxWidth: 880, marginInline: "auto" }}>
          <MockupFrame header="Activity" right={<span>last 24h</span>}>
            <div>
              {COMMITS.map((c, i) => (
                <div
                  key={c.hash}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 100px 1fr auto",
                    alignItems: "baseline",
                    gap: "var(--space-4)",
                    paddingInline: "var(--space-5)",
                    paddingBlock: "var(--space-3)",
                    borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "var(--ink-muted)" }}>
                    {c.hash}
                  </span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "var(--ink-muted)" }}>
                    {c.author}
                  </span>
                  <span style={{ fontSize: 14 }}>
                    <span style={{ color: "var(--ink-primary)", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                      {c.verb}
                    </span>
                    <span style={{ color: "var(--ink-secondary)", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                      {" "}
                      {c.rest}
                    </span>
                  </span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "var(--ink-muted)", textAlign: "right" }}>
                    {c.time}
                  </span>
                </div>
              ))}
            </div>
          </MockupFrame>
        </div>
      </Container>
    </section>
  );
}

function CtaBanner() {
  return (
    <section style={{ paddingBlock: "var(--space-10)" }}>
      <Container>
        <div style={{ maxWidth: 720, marginInline: "auto", textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark-dark.svg"
            alt=""
            height={28}
            style={{ height: 28, width: "auto", display: "block", marginInline: "auto", marginBottom: "var(--space-5)" }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 3vw + 1rem, 3.25rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "var(--ink-primary)",
            }}
          >
            Your AI workforce is one command away.
          </h2>
          <div style={{ marginTop: "var(--space-7)" }}>
            <TerminalBlock idSuffix="cta" />
          </div>
          <div style={{ marginTop: "var(--space-5)" }}>
            <a
              href="https://github.com/sandydasari/openacme#readme"
              style={{ color: "var(--ink-secondary)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
            >
              Read the docs →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        paddingBlock: "var(--space-8) var(--space-7)",
        borderTop: "1px solid var(--hairline)",
        marginTop: "auto",
      }}
    >
      <Container>
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark-dark.svg" alt="" height={24} style={{ height: 24, width: "auto", display: "block" }} />
              <span
                style={{
                  fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-primary)",
                }}
              >
                OpenAcme
              </span>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: 13, color: "var(--ink-muted)" }}>
              © 2026 OpenAcme. MIT licensed.
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3) var(--space-5)" }}>
            <a href="https://github.com/sandydasari/openacme#readme" style={{ fontSize: 14, color: "var(--ink-secondary)", textDecoration: "none" }}>
              Docs
            </a>
            <a href="https://github.com/sandydasari/openacme" style={{ fontSize: 14, color: "var(--ink-secondary)", textDecoration: "none" }}>
              GitHub
            </a>
            <a href="#" style={{ fontSize: 14, color: "var(--ink-secondary)", textDecoration: "none" }}>
              Privacy
            </a>
            <a href="#" style={{ fontSize: 14, color: "var(--ink-secondary)", textDecoration: "none" }}>
              Status
            </a>
          </div>
          <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-muted)", textAlign: "right" }} className="footer-attr">
            Built with OpenAcme
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <UseCases />
        <Features />
        <Proof />
        <CtaBanner />
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes arc-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          ellipse[style*="arc-drift"] { animation: none !important; }
        }
        .nav-docs { display: inline; }
        @media (max-width: 768px) {
          .nav-docs { display: none !important; }
        }
        .use-case-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-7);
          align-items: center;
        }
        .use-case-row .use-case-text { order: 1; }
        .use-case-row .use-case-mockup { order: 2; }
        @media (min-width: 1024px) {
          .use-case-row { grid-template-columns: 1fr 1fr; gap: var(--space-9); }
          .use-case-row.text-first .use-case-text { order: 1; }
          .use-case-row.text-first .use-case-mockup { order: 2; }
          .use-case-row.mockup-first .use-case-mockup { order: 1; }
          .use-case-row.mockup-first .use-case-text { order: 2; }
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
          }
        }
        @media (max-width: 767px) {
          .footer-attr { text-align: left !important; }
        }
      `}</style>
    </>
  );
}
