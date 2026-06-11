import { useState } from "react";

const QUESTIONS = [
  // Section 1 — Story Foundation
  { section: 1, label: "STORY FOUNDATION", text: "How clearly documented is your firm's founding story and original brand promise?", options: ["Not documented", "Informal / lives in the founder's head", "Partially documented, not actively used", "Clearly documented and referenced"] },
  { section: 1, label: "STORY FOUNDATION", text: "If you asked three senior leaders to describe what truly differentiates your firm, how aligned would their answers be?", options: ["Completely different", "Some overlap, but not consistent", "Mostly aligned", "Highly aligned and repeatable"] },
  { section: 1, label: "STORY FOUNDATION", text: "Does your brand clearly express a point of view (POV) about how work should be done in your industry?", options: ["No clear POV", "Implicit, but not articulated", "Articulated but inconsistently used", "Clearly articulated and reinforced"] },
  { section: 1, label: "STORY FOUNDATION", text: "Which best describes your current brand positioning?", options: ['"We sound like everyone else"', '"We know we\'re different, but struggle to explain it"', '"We\'re clear, but only in certain situations"', '"We\'re clear and confident across audiences"'] },

  // Section 2 — Story Translation
  { section: 2, label: "STORY TRANSLATION", text: "How consistently are your services and capabilities described across teams?", options: ["Inconsistent and confusing", "Different teams describe us differently", "Mostly consistent, with some gaps", "Consistent and clear"] },
  { section: 2, label: "STORY TRANSLATION", text: "Do different audiences receive a consistent version of the same story?", options: ["No — it changes completely", "Somewhat — depends on the channel", "Mostly — with some effort", "Yes — one story, adapted cleanly"] },
  { section: 2, label: "STORY TRANSLATION", text: "How often do marketing efforts feel disconnected from actual sales conversations?", options: ["Almost always", "Frequently", "Occasionally", "Rarely"] },
  { section: 2, label: "STORY TRANSLATION", text: "Which statement feels most accurate regarding your messaging?", options: ['"Messaging is active, but we can\'t measure its impact"', '"Sales and marketing tell different stories"', '"We\'re working to close the gap"', '"Messaging directly supports revenue"'] },

  // Section 3 — Story Governance
  { section: 3, label: "STORY GOVERNANCE", text: "Is your brand story documented in a single, authoritative source?", options: ["No", "Multiple disconnected documents", "Partially centralized, but different versions exist", "Yes — one source of brand truth"] },
  { section: 3, label: "STORY GOVERNANCE", text: "When new hires join, how are they introduced to the brand story?", options: ["Not at all", "Informally", "Through onboarding materials", "As a core part of onboarding"] },
  { section: 3, label: "STORY GOVERNANCE", text: "How is your brand story maintained as your firm grows?", options: ["It isn't", "Different teams make frequent updates", "It's managed based on current needs", "It's intentionally governed and maintained"] },
  { section: 3, label: "STORY GOVERNANCE", text: "Which best describes your most pressing brand story challenge?", options: ["I'm the only one who can tell our story — and that doesn't scale", "We struggle to explain what makes us different from competitors", "Our story works sometimes, but breaks down across teams and channels", "We're growing fast and need to protect our differentiation as we scale"] },
];

const SECTION_NAMES = { 1: "Story Foundation", 2: "Story Translation", 3: "Story Governance" };

function calcScore(answers) {
  const total = answers.reduce((s, a) => s + a, 0);
  const s1 = answers.slice(0, 4).reduce((s, a) => s + a, 0);
  const s2 = answers.slice(4, 8).reduce((s, a) => s + a, 0);
  const s3 = answers.slice(8, 12).reduce((s, a) => s + a, 0);
  let maturity, maturityShort;
  if (total <= 20)      { maturity = "No Story OS Installed";                              maturityShort = "no-os";    }
  else if (total <= 29) { maturity = "Partial / Fragile Story OS";                         maturityShort = "partial";  }
  else if (total <= 38) { maturity = "Market-Facing Alignment, Internal Story Erosion";    maturityShort = "erosion";  }
  else                  { maturity = "Governed Story OS";                                  maturityShort = "governed"; }
  const proportions = [s1 / 16, s2 / 16, s3 / 16];
  const minProp = Math.min(...proportions);
  const allTied = proportions.every(p => p === minProp);
  const weakestSection = allTied ? null : SECTION_NAMES[proportions.indexOf(minProp) + 1];
  return { total, s1, s2, s3, maturity, maturityShort, weakestSection, hasWeakness: !allTied };
}

const BAND = {
  "no-os": {
    diagnosis: "Your firm's growth has outpaced its brand architecture. Without a structured narrative foundation, drift is not a risk — it's already happening.",
    pathTitle: "Recommended Next Step: Brandtelling Brand Guidance Service",
    pathBody: "The Brand Guidance Service provides the strategic oversight your firm needs to stop reactive, fragmented marketing and install a narrative foundation that can support your next stage of growth.",
    links: [{ label: "Learn more about the Brand Guidance Service", url: "https://www.brandtelling.com/brand-guidance-service" }],
    ctaText: "Before governance can occur, a foundation must exist. The Brand Guidance Service is designed for firms at exactly this stage.",
    ctaLabel: "Explore the Brand Guidance Service",
    ctaUrl: "https://www.brandtelling.com/brand-guidance-service"
  },
  partial: {
    diagnosis: "Your firm has momentum but lacks a defensible market position. Without a defined Category of One, differentiation depends on how well any individual explains it on a given day.",
    pathTitle: "Recommended Next Step: Brand Narrative Audit",
    pathBody: "A Brand Narrative Audit identifies where your story is breaking down and gives you a clear foundation to build from — so differentiation stops living in people's heads and starts working across every conversation.",
    links: [],
    ctaText: "Differentiation that lives in people's heads instead of documented architecture will not survive growth.",
    ctaLabel: "Book a Brand Narrative Audit",
    ctaUrl: "https://www.brandtelling.com/brand-narrative-audit"
  },
  erosion: {
    diagnosis: "Your brand presents well externally but is losing integrity internally. What leadership knows, the broader team cannot reliably articulate. That gap widens as you scale.",
    pathTitle: "Recommended Next Step: Brand Narrative Audit",
    pathBody: "A Brand Narrative Audit surfaces where internal clarity is breaking down before it becomes a market-facing problem — and gives your team a shared story they can actually use.",
    links: [],
    ctaText: "Alignment restores clarity. A Brand Narrative Audit is where that work begins.",
    ctaLabel: "Book a Brand Narrative Audit",
    ctaUrl: "https://www.brandtelling.com/brand-narrative-audit"
  },
  governed: {
    diagnosis: "Your responses reflect a firm that has done the work. The risk at this stage is not collapse — it's quiet decay. Governance compounds or erodes; it does not hold still.",
    pathTitle: "Recommended Next Step: Brand Management Subscription",
    pathBody: "Your Story OS appears largely documented and structured. Sustained leverage depends on governance. The Brandtelling® Brand Management Subscription installs ownership, oversight, and narrative protection across the firm.",
    links: [],
    ctaText: "Clarity doesn't disappear. It decays when it isn't governed. Ongoing Brand Management ensures what you've built continues to strengthen as your firm scales.",
    ctaLabel: "Book a Brand Management Review",
    ctaUrl: "https://calendly.com/arthurgermain/brand-management-review"
  },
};

const PHASE = { GATE: "gate", WELCOME: "welcome", DIAGNOSTIC: "diagnostic", RESULTS: "results" };
const gold = "#c5a35e";

export default function App() {
  const [phase, setPhase]             = useState(PHASE.GATE);
  const [passcode, setPasscode]       = useState("");
  const [passcodeError, setPCError]   = useState(false);
  const [currentQ, setCurrentQ]       = useState(0);
  const [answers, setAnswers]         = useState([]);
  const [selected, setSelected]       = useState(null);
  const [visible, setVisible]         = useState(true);
  const [results, setResults]         = useState(null);
  const [hoveredOpt, setHoveredOpt]   = useState(null);

  const transition = fn => { setVisible(false); setTimeout(() => { fn(); setVisible(true); }, 280); };

  const handlePasscode = () => {
    if (passcode.trim().toLowerCase() === "storyos go") { transition(() => setPhase(PHASE.WELCOME)); }
    else { setPCError(true); setPasscode(""); setTimeout(() => setPCError(false), 2000); }
  };

  const handleBegin = () => transition(() => { setPhase(PHASE.DIAGNOSTIC); setCurrentQ(0); setAnswers([]); setSelected(null); });

  const handleNext = () => {
    if (selected === null) return;
    const na = [...answers, selected];
    if (currentQ < QUESTIONS.length - 1) {
      transition(() => { setAnswers(na); setCurrentQ(currentQ + 1); setSelected(null); });
    } else {
      const r = calcScore(na); setResults(r);
      transition(() => setPhase(PHASE.RESULTS));
    }
  };

  const pct = Math.round((currentQ / QUESTIONS.length) * 100);

  const Divider = ({ title }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: gold }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(197,163,94,0.15)" }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e8e3d9", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #333; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(197,163,94,0.2); border-radius: 2px; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 660 }}>

        {/* Masthead */}
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 52, display: "flex", alignItems: "center", gap: 14 }}>
          Brandtelling® Story OS Diagnostic (v3)
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(197,163,94,0.35), transparent)" }} />
        </div>

        <div style={{ transition: "opacity 0.28s ease, transform 0.28s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}>

          {/* ── GATE ── */}
          {phase === PHASE.GATE && (
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,5vw,44px)", fontWeight: 600, lineHeight: 1.15, color: "#f0ece2", marginBottom: 14 }}>This diagnostic<br />is locked.</h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "#7a7570", marginBottom: 36, lineHeight: 1.65 }}>Please enter your PassCode to begin.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${passcodeError ? "rgba(200,70,70,0.6)" : "rgba(197,163,94,0.2)"}`, borderRadius: 3, padding: "13px 16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "#e8e3d9", outline: "none" }}
                  type="text" placeholder="PassCode" value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handlePasscode()}
                  autoFocus
                />
                <button onClick={handlePasscode} style={{ background: gold, color: "#0d1117", border: "none", borderRadius: 3, padding: "13px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Enter</button>
              </div>
              {passcodeError && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(210,80,80,0.85)", marginTop: 10 }}>Incorrect PassCode. Please try again.</p>}
            </div>
          )}

          {/* ── WELCOME ── */}
          {phase === PHASE.WELCOME && (
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 18 }}>Brand Maturity Assessment</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px,5vw,38px)", fontWeight: 600, lineHeight: 1.2, color: "#f0ece2", marginBottom: 24 }}>Welcome to the Brandtelling®<br />Story OS Diagnostic</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "#8a8478", marginBottom: 30 }}>Founder-led firms don't lose momentum because they stop being good at what they do. They lose it because growth quietly fractures the story that once made them distinct.</p>
              {[
                { head: "In the next few minutes, you'll assess:", items: ["Whether your founding story and POV still anchor the business", "How clearly your services and differentiation translate across teams", "Whether your brand is governed as the firm grows"] },
                { head: "At the end, you'll receive:", items: ["A Story OS maturity reflection", "A map of where internal confusion may be leaking value", "A practical path forward"] }
              ].map((block, bi) => (
                <div key={bi} style={{ marginBottom: 22 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#555", letterSpacing: "0.04em", marginBottom: 10 }}>{block.head}</p>
                  {block.items.map((item, ii) => (
                    <div key={ii} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, display: "flex", gap: 12, fontSize: 14, color: "#7a7570", marginBottom: 8, lineHeight: 1.55 }}>
                      <span style={{ color: "rgba(197,163,94,0.4)", flexShrink: 0 }}>—</span>{item}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 36 }}>
                {[["⏱", "~4–5 minutes"], ["👤", "Founders & senior leaders"], ["📋", "12 questions"]].map(([icon, lbl]) => (
                  <span key={lbl} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#666" }}>{icon} <span style={{ color: "#888" }}>{lbl}</span></span>
                ))}
              </div>
              <button onClick={handleBegin} style={{ background: gold, color: "#0d1117", border: "none", borderRadius: 3, padding: "14px 30px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Begin</button>
            </div>
          )}

          {/* ── DIAGNOSTIC ── */}
          {phase === PHASE.DIAGNOSTIC && (
            <div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, marginBottom: 34, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, rgba(197,163,94,0.4), ${gold})`, transition: "width 0.4s ease" }} />
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>{QUESTIONS[currentQ].label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: "#3a3730", marginBottom: 18, letterSpacing: "0.04em" }}>Question {currentQ + 1} of {QUESTIONS.length}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,3.5vw,27px)", fontWeight: 600, lineHeight: 1.35, color: "#f0ece2", marginBottom: 28 }}>{QUESTIONS[currentQ].text}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30 }}>
                {QUESTIONS[currentQ].options.map((opt, i) => {
                  const isSel = selected === i + 1;
                  const isHov = hoveredOpt === i;
                  return (
                    <button key={i} onClick={() => setSelected(i + 1)} onMouseEnter={() => setHoveredOpt(i)} onMouseLeave={() => setHoveredOpt(null)}
                      style={{ background: isSel ? "rgba(197,163,94,0.1)" : isHov ? "rgba(197,163,94,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${isSel ? "rgba(197,163,94,0.5)" : isHov ? "rgba(197,163,94,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius: 3, padding: "13px 16px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 14, color: isSel ? "#e8e3d9" : isHov ? "#c0bbb3" : "#8a8478", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.5, transition: "all 0.15s ease" }}>
                      <span style={{ fontSize: 11, color: isSel ? gold : "#3a3730", fontWeight: 500, marginTop: 2, minWidth: 14, flexShrink: 0 }}>{i + 1}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleNext} disabled={selected === null}
                  style={{ background: selected === null ? "rgba(197,163,94,0.18)" : gold, color: selected === null ? "rgba(13,17,23,0.35)" : "#0d1117", border: "none", borderRadius: 3, padding: "13px 26px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: selected === null ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
                  {currentQ < QUESTIONS.length - 1 ? "Continue" : "View Results"}
                </button>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {phase === PHASE.RESULTS && results && (() => {
            const band = BAND[results.maturityShort];
            const sections = [
              { label: "Story Foundation",   score: results.s1, max: 16 },
              { label: "Story Translation",  score: results.s2, max: 16 },
              { label: "Story Governance",   score: results.s3, max: 16 },
            ];
            return (
              <div style={{ maxHeight: "72vh", overflowY: "auto", paddingRight: 8 }}>

                {/* Score header */}
                <div style={{ borderBottom: "1px solid rgba(197,163,94,0.15)", paddingBottom: 28, marginBottom: 32 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>Your Results</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 600, color: "#f0ece2", lineHeight: 1.2, marginBottom: 16 }}>Story OS Diagnostic<br />Report</h2>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 600, color: gold, lineHeight: 1 }}>{results.total}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 20, color: "#3a3730" }}>/ 48</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#7a7570", marginTop: 8 }}>Story OS Maturity: <strong style={{ color: gold, fontWeight: 500 }}>{results.maturity}</strong></p>
                </div>

                {/* Internal Confusion Map */}
                <div style={{ marginBottom: 34 }}>
                  <Divider title="Internal Confusion Map™" />
                  {sections.map(s => {
                    const weak = s.label === results.weakestSection;
                    return (
                      <div key={s.label} style={{ marginBottom: 16 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, display: "flex", justifyContent: "space-between", fontSize: 13, color: weak ? "#e8c47a" : "#8a8478", marginBottom: 7 }}>
                          <span>{s.label}{weak ? " ▴" : ""}</span>
                          <span style={{ color: "#3a3730" }}>{s.score} / {s.max}</span>
                        </div>
                        <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(s.score / s.max) * 100}%`, background: weak ? gold : "rgba(197,163,94,0.35)", borderRadius: 2 }} />
                        </div>
                      </div>
                    );
                  })}
                  {results.hasWeakness && (
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: "#7a7570", marginTop: 18, padding: "12px 16px", borderLeft: "2px solid rgba(197,163,94,0.3)", lineHeight: 1.65 }}>
                      Your lowest-scoring area is <strong style={{ color: gold, fontWeight: 500 }}>{results.weakestSection}</strong>. This is where internal confusion is most likely leaking value.
                    </div>
                  )}
                </div>

                {/* Diagnosis */}
                <div style={{ marginBottom: 34 }}>
                  <Divider title="Growth Friction Diagnosis" />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "#7a7570" }}>{band.diagnosis}</p>
                </div>

                {/* Path forward */}
                <div style={{ marginBottom: 34 }}>
                  <Divider title="Story OS Path Forward" />
                  <div style={{ background: "rgba(197,163,94,0.05)", border: "1px solid rgba(197,163,94,0.14)", borderRadius: 4, padding: "22px 24px" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: "#f0ece2", marginBottom: 12, lineHeight: 1.3 }}>{band.pathTitle}</p>
                    {band.pathBody && <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: "#7a7570", marginBottom: 16 }}>{band.pathBody}</p>}
                    {band.links.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {band.links.map((l, i) => (
                          <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: gold, textDecoration: "none", borderBottom: "1px solid rgba(197,163,94,0.22)", paddingBottom: 2, display: "inline-flex", gap: 6 }}>{l.label} →</a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: 24, marginBottom: 36 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: "#6a6560", marginBottom: 18 }}>{band.ctaText}</p>
                  <a href={band.ctaUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: gold, color: "#0d1117", textDecoration: "none", borderRadius: 3, padding: "12px 22px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.09em", textTransform: "uppercase" }}>{band.ctaLabel}</a>
                </div>

                {/* Close */}
                <div style={{ textAlign: "center", padding: "36px 0" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, color: "rgba(197,163,94,0.2)", marginBottom: 18 }}>◆</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: "#4a4740", lineHeight: 1.75 }}>
                    This diagnostic concludes our session.<br />
                    To discuss installing your Story Operating System, reach out at{" "}
                    <a href="mailto:arthur@brandtelling.com" style={{ color: gold, textDecoration: "none", borderBottom: "1px solid rgba(197,163,94,0.25)" }}>arthur@brandtelling.com</a>
                  </p>
                </div>

              </div>
            );
          })()}

        </div>
      </div>
    </div>
  );
}