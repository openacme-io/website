"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const REPO_URL = "https://github.com/sandydasari/openacme";
const DOCS_URL = "https://github.com/sandydasari/openacme/tree/master/apps/docs";
const MAILTO = "mailto:sandydasari977@gmail.com";

const INSTALL_PRIMARY = "npm install -g @openacme/cli";
const INSTALL_SECONDARY = [
  { cmd: "openacme setup", comment: "# interactive wizard — pick a provider, configure your first agent" },
  { cmd: "openacme", comment: "# start the background daemon + open the web UI" },
];

type ViewKey = "home" | "agents" | "tasks" | "chat";

type View = {
  key: ViewKey;
  label: string;
  caption: string;
  image: string;
  alt: string;
  video: string | null;
};

const VIEWS: View[] = [
  {
    key: "home",
    label: "HOME",
    caption: "Who's working, who's waiting on you.",
    image: "/product-hero.png",
    alt: "OpenAcme Home view — running daemon showing active agents and tasks.",
    video: null,
  },
  {
    key: "agents",
    label: "AGENTS",
    caption: "Every coworker's role, persona, tools, model.",
    image: "/product-workforce.png",
    alt: "OpenAcme Agents view — workforce members with role, model, and tools.",
    video: "/videos/demo-website-build.mp4",
  },
  {
    key: "tasks",
    label: "TASKS",
    caption: "The shared board everyone reads from and writes to.",
    image: "/product-tasks.png",
    alt: "OpenAcme Tasks view — shared task board with status, dependencies, and assignees.",
    video: "/videos/demo-code-review.mp4",
  },
  {
    key: "chat",
    label: "CHAT",
    caption: "A session per agent, with tool calls inline.",
    image: "/product-chat.png",
    alt: "OpenAcme Chat view — session with one agent, tool calls inline.",
    video: "/videos/demo-data-pipeline.mp4",
  },
];

const ORG_STANZAS = [
  {
    label: "FLAT",
    body: "A handful of specialists, each owning a domain. You talk to each directly.",
  },
  {
    label: "MANAGER-LED",
    body: "Write a persona for an agent whose job is to take your asks, decompose them, and assign them. You talk to the manager; the manager talks to the team.",
  },
  {
    label: "SPECIALIST TEAMS",
    body: "An engineering lead with two coders under them, a research lead with two analysts. Trees as deep as you want.",
  },
];

const LAPTOP_ROWS = [
  {
    label: "LOCAL-FIRST",
    body: (
      <>
        OpenAcme is a daemon that runs locally. Sessions, tasks, agent memories, OAuth tokens — all under{" "}
        <code className="mono">~/.openacme/</code>. Your prompts go to whichever model provider you chose; nothing else
        leaves the machine. No telemetry.
      </>
    ),
  },
  {
    label: "BRING YOUR OWN MODEL",
    body: (
      <>
        Anthropic, OpenAI, Google, OpenRouter, Ollama, or any OpenAI-compatible endpoint. Sign in with a Claude Pro or
        ChatGPT Plus subscription you already have and that plan drives the workforce — no double-paying your provider.
      </>
    ),
  },
  {
    label: "YOUR CHROME",
    body: (
      <>
        The Chrome your agents drive is yours. Log into your accounts once; every agent inherits the session. Each agent
        owns its own tabs so they don&rsquo;t trample each other.
      </>
    ),
  },
  {
    label: "REAL SQLITE",
    body: (
      <>
        Memory persists. The agent you&rsquo;ve shaped over three months remembers your conventions across sessions. The
        task board, comments, and event log live in a real SQLite database — query it, back it up, fork it.
      </>
    ),
  },
];

function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      fill="currentColor"
      role="img"
      aria-label="OpenAcme"
      style={{ display: "block" }}
    >
      <title>OpenAcme</title>
      <rect x="3" y="1" width="3" height="1" />
      <rect x="4" y="2" width="1" height="2" />
      <rect x="1" y="5" width="1" height="1" />
      <rect x="2" y="4" width="6" height="2" />
      <rect x="8" y="5" width="1" height="1" />
      <rect x="0" y="6" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="8" y="6" width="2" height="2" />
      <rect x="0" y="8" width="10" height="2" />
    </svg>
  );
}

function Container({
  children,
  maxWidth = 1120,
  style,
}: {
  children: React.ReactNode;
  maxWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        maxWidth,
        marginInline: "auto",
        paddingInline: 24,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mono"
      style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--ink-faint)",
        margin: 0,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function H2({ children, maxWidth = "22ch" }: { children: React.ReactNode; maxWidth?: string }) {
  return (
    <h2
      style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        maxWidth,
        textWrap: "balance",
      }}
    >
      {children}
    </h2>
  );
}

function PrimaryButton({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    background: "var(--ink)",
    color: "var(--paper)",
    border: "1px solid var(--ink)",
    borderRadius: 0,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background var(--motion-default) var(--ease-out)",
  };
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        onClick={onClick}
        className="btn-primary"
        style={style}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className="btn-primary" style={style} onClick={onClick}>
      {children}
    </button>
  );
}

function GhostButton({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    background: "transparent",
    color: "var(--ink)",
    border: "1px solid var(--paper-rule)",
    borderRadius: 0,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background var(--motion-default) var(--ease-out)",
  };
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        onClick={onClick}
        className="btn-ghost"
        style={style}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className="btn-ghost" style={style} onClick={onClick}>
      {children}
    </button>
  );
}

function ClipboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="3.5" y="2.5" width="7" height="9" />
      <path d="M5 4.5h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 7.5l3 3 5-6" />
    </svg>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handle = useCallback(() => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    });
  }, [value]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {copied && (
        <span
          className="mono"
          aria-live="polite"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--plot-red)",
          }}
        >
          COPIED
        </span>
      )}
      <button
        type="button"
        aria-label="Copy install command"
        onClick={handle}
        className="btn-copy"
        style={{
          width: 28,
          height: 28,
          padding: 0,
          background: "transparent",
          border: "1px solid var(--paper-rule)",
          borderRadius: 0,
          color: "var(--ink-soft)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "color var(--motion-default) var(--ease-out), background var(--motion-default) var(--ease-out)",
        }}
      >
        {copied ? <CheckIcon /> : <ClipboardIcon />}
      </button>
    </span>
  );
}

function CodeBlock({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: { cmd: string; comment: string }[];
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px 20px",
          background: "var(--paper-sunk)",
          border: "1px solid var(--paper-rule)",
          borderRadius: 0,
        }}
      >
        <pre
          className="mono"
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.4,
            color: "var(--ink)",
            overflowX: "auto",
            flex: 1,
          }}
        >
          <span style={{ color: "var(--ink-faint)" }}>$ </span>
          {primary}
        </pre>
        <CopyButton value={primary} />
      </div>
      {secondary && secondary.length > 0 && (
        <pre
          className="mono"
          style={{
            margin: 0,
            marginTop: 12,
            padding: "16px 20px",
            background: "var(--paper-sunk)",
            border: "1px solid var(--paper-rule)",
            borderRadius: 0,
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--ink)",
            overflowX: "auto",
          }}
        >
          {secondary.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              <span style={{ color: "var(--ink-faint)" }}>$ </span>
              {line.cmd}
              <span style={{ color: "var(--ink-faint)" }}>       {line.comment}</span>
            </span>
          ))}
        </pre>
      )}
    </div>
  );
}

function InstallBlock({ id }: { id?: string }) {
  return (
    <section
      id={id}
      style={{
        paddingBlock: 64,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container maxWidth={720}>
        <Eyebrow>Install</Eyebrow>
        <CodeBlock primary={INSTALL_PRIMARY} secondary={INSTALL_SECONDARY} />
        <p
          style={{
            margin: 0,
            marginTop: 16,
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--ink-soft)",
          }}
        >
          Requires Node ≥ 18 · macOS / Linux
        </p>
      </Container>
    </section>
  );
}

function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container>
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <a
            href="#top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <span style={{ width: 28, height: 28, display: "inline-flex", color: "var(--ink)" }}>
              <LogoMark size={28} />
            </span>
            <span
              className="nav-wordmark"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--ink)",
              }}
            >
              OpenAcme
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-link"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: 14,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color var(--motion-default) var(--ease-out)",
              }}
            >
              Docs ↗
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-link-github"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: 14,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color var(--motion-default) var(--ease-out)",
              }}
            >
              GitHub ↗
            </a>
            <PrimaryButton href="#install">Install</PrimaryButton>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container maxWidth={960}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          An AI workforce. You&rsquo;re the founder.
        </h1>
        <p
          style={{
            margin: 0,
            marginTop: 20,
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            maxWidth: "60ch",
          }}
        >
          Not a single assistant. Not a fixed team of four. A workforce — named agents with roles, models, tools, and
          memory — that scales the way you want and self-organizes through delegation. You steer.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PrimaryButton href="#install">Install →</PrimaryButton>
          <GhostButton href={REPO_URL}>GitHub ↗</GhostButton>
        </div>
        <p
          className="mono"
          style={{
            margin: 0,
            marginTop: 40,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
          }}
        >
          LOCAL-FIRST · BRING-YOUR-OWN-MODEL · MCP-NATIVE · MULTI-AGENT
        </p>
      </Container>
    </section>
  );
}

function OrgShape() {
  return (
    <section
      style={{
        paddingBlock: 96,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container>
        <Eyebrow>Shape</Eyebrow>
        <H2>Shape it the way an org actually works.</H2>
        <p
          style={{
            margin: 0,
            marginTop: 20,
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            maxWidth: "60ch",
          }}
        >
          You decide the headcount and the org chart. A few common shapes:
        </p>
        <div style={{ marginTop: 48 }}>
          {ORG_STANZAS.map((s) => (
            <div
              key={s.label}
              className="stanza-row"
              style={{
                paddingBlock: 32,
                borderTop: "1px solid var(--paper-rule)",
              }}
            >
              <div className="stanza-grid">
                <p
                  className="mono"
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    lineHeight: 1,
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--ink)",
                    maxWidth: "65ch",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--paper-rule)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink)",
              maxWidth: "70ch",
            }}
          >
            Each agent is a folder on disk — <code className="mono">AGENT.md</code>{" "}
            (its role and persona), a workspace, files you&rsquo;ve left for it, a private memory. Add one, retire one,
            give one a different model. You&rsquo;re the org chart.
          </p>
        </div>
      </Container>
    </section>
  );
}

function HowItFeels() {
  return (
    <section
      style={{
        paddingBlock: 96,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container>
        <Eyebrow>Workflow</Eyebrow>
        <H2>What it feels like to use.</H2>
        <p
          style={{
            margin: 0,
            marginTop: 20,
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            maxWidth: "60ch",
          }}
        >
          You hand the workforce a goal — at whatever altitude you want.
        </p>
        <div className="feel-grid" style={{ marginTop: 48 }}>
          <div className="feel-cell">
            <p
              className="mono"
              style={{
                margin: 0,
                marginBottom: 16,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                lineHeight: 1,
              }}
            >
              HIGH ALTITUDE
            </p>
            <p
              style={{
                margin: 0,
                marginBottom: 16,
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink)",
              }}
            >
              &ldquo;Ship the v2 settings page by Friday.&rdquo;
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--ink)",
              }}
            >
              You drop that at the top of your chain. It gets decomposed: spec, implementation, QA pass, release note.
              The pieces land on the board with dependencies wired up. Specialists pick up their slices and work in
              parallel. The decisions the workforce can&rsquo;t make on its own surface as waiting on you. You make
              those calls; the rest happens without you.
            </p>
          </div>
          <div className="feel-divider" aria-hidden />
          <div className="feel-cell">
            <p
              className="mono"
              style={{
                margin: 0,
                marginBottom: 16,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                lineHeight: 1,
              }}
            >
              LOW ALTITUDE
            </p>
            <p
              style={{
                margin: 0,
                marginBottom: 16,
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink)",
              }}
            >
              &ldquo;Fix the flaky test in <code className="mono" style={{ fontStyle: "normal" }}>task-scheduler.test.ts</code>.&rdquo;
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--ink)",
              }}
            >
              Goes straight to your engineer. Done before lunch.
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--paper-rule)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink)",
              maxWidth: "70ch",
            }}
          >
            Either way, you&rsquo;re not running the play-by-play. You set goals, you answer the few questions the
            workforce escalates, you read the results.
          </p>
        </div>
      </Container>
    </section>
  );
}

function VideoModal({ view, onClose }: { view: View; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  if (!view.video) return null;
  const labelId = `modal-label-${view.key}`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26, 26, 30, 0.72)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1024px, 92vw)",
          background: "var(--paper)",
          border: "1px solid var(--paper-rule)",
          borderRadius: 0,
        }}
      >
        <div
          style={{
            height: 48,
            paddingInline: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--paper-rule)",
          }}
        >
          <span
            id={labelId}
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-faint)",
            }}
          >
            {view.label} · DEMO
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              padding: 0,
              background: "transparent",
              border: "1px solid var(--paper-rule)",
              borderRadius: 0,
              color: "var(--ink)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster={view.image}
          style={{
            display: "block",
            width: "100%",
            background: "var(--paper-sunk)",
            aspectRatio: "16 / 9",
          }}
        >
          <source src={view.video} type="video/mp4" />
        </video>
        <div
          style={{
            height: 48,
            paddingInline: 16,
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid var(--paper-rule)",
          }}
        >
          <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>{view.caption}</span>
        </div>
      </div>
    </div>
  );
}

function FourViews() {
  const [openView, setOpenView] = useState<View | null>(null);
  return (
    <section
      style={{
        paddingBlock: 96,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container>
        <Eyebrow>The Operator&rsquo;s Console</Eyebrow>
        <H2 maxWidth="24ch">Four views on the same workforce.</H2>
        <p
          style={{
            margin: 0,
            marginTop: 20,
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            maxWidth: "60ch",
          }}
        >
          Real screenshots of the running daemon. Click any view to watch the workforce work.
        </p>
        <div
          className="views-grid"
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "var(--paper-rule)",
            border: "1px solid var(--paper-rule)",
          }}
        >
          {VIEWS.map((v) => {
            const interactive = !!v.video;
            const cellInner = (
              <>
                <img
                  src={v.image}
                  alt={v.alt}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    border: "1px solid var(--paper-rule)",
                    background: "var(--paper-sunk)",
                  }}
                />
                <div style={{ marginTop: 16 }}>
                  <p
                    className="mono view-label"
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: interactive ? "var(--ink-faint)" : "var(--ink-faint)",
                      lineHeight: 1,
                    }}
                  >
                    {v.label}
                    {interactive && (
                      <>
                        {" → WATCH "}
                        <span className="view-arrow">▸</span>
                      </>
                    )}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      marginTop: 8,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--ink-soft)",
                    }}
                  >
                    {v.caption}
                  </p>
                </div>
              </>
            );
            const cellStyle: React.CSSProperties = {
              background: "var(--paper)",
              padding: 24,
              display: "block",
              textAlign: "left",
              border: "none",
              width: "100%",
              color: "inherit",
              font: "inherit",
              cursor: interactive ? "pointer" : "default",
            };
            if (interactive) {
              return (
                <button
                  key={v.key}
                  type="button"
                  className="view-cell view-cell-interactive"
                  style={cellStyle}
                  onClick={() => setOpenView(v)}
                  aria-label={`Watch ${v.label} demo`}
                >
                  {cellInner}
                </button>
              );
            }
            return (
              <div key={v.key} className="view-cell" style={cellStyle}>
                {cellInner}
              </div>
            );
          })}
        </div>
      </Container>
      {openView && <VideoModal view={openView} onClose={() => setOpenView(null)} />}
    </section>
  );
}

function OnYourLaptop() {
  return (
    <section
      style={{
        paddingBlock: 96,
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <Container>
        <Eyebrow>Runtime</Eyebrow>
        <H2>On your laptop, on your terms.</H2>
        <div style={{ marginTop: 48 }}>
          {LAPTOP_ROWS.map((r) => (
            <div
              key={r.label}
              className="stanza-row"
              style={{
                paddingBlock: 32,
                borderTop: "1px solid var(--paper-rule)",
              }}
            >
              <div className="stanza-grid">
                <p
                  className="mono"
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-faint)",
                    lineHeight: 1,
                  }}
                >
                  {r.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--ink)",
                    maxWidth: "65ch",
                  }}
                >
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--paper)" }}>
      <Container>
        <div
          className="footer-row"
          style={{
            minHeight: 96,
            paddingBlock: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink-soft)" }}>
            <span style={{ width: 24, height: 24, display: "inline-flex" }}>
              <LogoMark size={24} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 13,
                color: "var(--ink-soft)",
              }}
            >
              OpenAcme
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              className="mono"
              style={{ fontSize: 12, color: "var(--ink-soft)" }}
            >
              MIT
            </span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mono nav-link"
              style={{
                fontSize: 12,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color var(--motion-default) var(--ease-out)",
              }}
            >
              GITHUB ↗
            </a>
            <a
              href={MAILTO}
              className="mono nav-link"
              style={{
                fontSize: 12,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color var(--motion-default) var(--ease-out)",
              }}
            >
              SANDYDASARI
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="mono skip-link"
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        padding: "10px 16px",
        background: "var(--ink)",
        color: "var(--paper)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textDecoration: "none",
        zIndex: 200,
      }}
    >
      Skip to content
    </a>
  );
}

export default function Page() {
  return (
    <>
      <SkipLink />
      <span id="top" />
      <Nav />
      <main id="main">
        <Hero />
        <InstallBlock id="install" />
        <OrgShape />
        <HowItFeels />
        <FourViews />
        <OnYourLaptop />
        <InstallBlock />
      </main>
      <Footer />
    </>
  );
}
