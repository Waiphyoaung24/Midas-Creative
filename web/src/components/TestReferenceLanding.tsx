"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUp,
  Briefcase,
  CheckCircle2,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  Target,
  X,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#about" },
  { label: "Why Us", href: "#features" },
  { label: "Style Lab", href: "#style-lab" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const serviceCards = [
  {
    icon: Briefcase,
    title: "Paid Search & Social",
    text: "Scale reach with intent-led campaigns across Google, Meta, and high-performing paid channels.",
  },
  {
    icon: MessageSquare,
    title: "Direct Response Creative",
    text: "Ad concepts, scripts, and hooks engineered to convert attention into qualified pipeline.",
  },
  {
    icon: Rocket,
    title: "CRO + Retention Systems",
    text: "Improve conversion and repeat revenue with landing page, checkout, and lifecycle optimization.",
  },
];

const featureRows = [
  {
    title: "Full-funnel strategy, not channel silos",
    text: "We connect paid media, creative, conversion, and CRM so every campaign contributes to measurable growth.",
  },
  {
    title: "Transparent execution and reporting",
    text: "Weekly dashboards, decision logs, and clear ownership keep your team aligned with outcomes.",
  },
];

const footerGroups = [
  {
    title: "Company",
    links: ["About Us", "Services", "Pricing"],
  },
  {
    title: "Products",
    links: ["Case Studies", "Insights", "Contact"],
  },
  {
    title: "Resources",
    links: ["FAQ", "Playbooks", "Terms"],
  },
  {
    title: "Relevant",
    links: ["Why Midas", "Our Process", "Clients"],
  },
];

const styleLines = [
  "Growth that compounds every quarter",
  "Creative that makes performance cheaper",
  "Positioning that closes better clients",
  "Systems that scale without chaos",
];

export function TestReferenceLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);
  const [styleMode, setStyleMode] = useState<"neon" | "minimal">("neon");
  const styleLabRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setShowGoTop(window.scrollY >= 800);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!styleLabRef.current) return;

    const ctx = gsap.context(() => {
      const textElements = gsap.utils.toArray<HTMLElement>(".scroll-style-text");
      textElements.forEach((text) => {
        gsap.to(text, {
          backgroundSize: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "center 80%",
            end: "center 20%",
            scrub: true,
          },
        });
      });
    }, styleLabRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <div id="top" className="landing-shell">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="font-display text-xl font-semibold tracking-[0.12em] text-white">
            MIDAS CREATIVE
          </a>

          <button
            className="rounded-lg border border-white/20 bg-white/5 p-2 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full landing-gradient-fill px-4 py-2 text-sm font-semibold text-black"
            >
              Get in touch
            </a>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-white/10 bg-black/90 p-4 md:hidden">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-4 inline-flex items-center gap-2 rounded-full landing-gradient-fill px-4 py-2 text-sm font-semibold text-black"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden py-20 md:py-28">
          <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-[26rem] w-[26rem] rounded-full bg-white/10 blur-3xl" />

          <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_480px] lg:items-center">
            <div>
              <p className="mb-6 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200">
                Your Full-Funnel Growth Agency
              </p>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] text-white md:text-7xl">
                Turn traffic into pipeline,
                <span className="landing-gradient-text block">
                  then pipeline into revenue.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                We build and optimize the systems behind demand generation, direct response creative, and conversion
                lift so your brand can scale predictably.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl landing-gradient-fill px-6 py-3.5 font-semibold text-black"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/85 to-black p-7">
              <p className="text-sm text-slate-400">Growth Snapshot</p>
              <p className="mt-1 font-display text-3xl font-semibold text-white">+178% Qualified Leads</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["ROAS", "4.6x"],
                  ["CAC", "-31%"],
                  ["CVR", "+42%"],
                  ["Retention", "+28%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-44 rounded-2xl border border-white/10 bg-black/50 p-4">
                <div className="flex h-full items-end gap-2">
                  {[24, 36, 34, 50, 44, 66, 58].map((h, i) => (
                    <span
                      key={`${h}-${i}`}
                      className="w-full rounded-t bg-gradient-to-b from-white to-zinc-500"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl text-center md:mx-auto">
              <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">What we do</h2>
              <p className="mt-4 text-lg text-slate-300">
                We combine paid media, content, CRO, and retention into one performance framework that compounds over
                time.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {serviceCards.map((card) => (
                <li key={card.title}>
                  <article className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-black p-7">
                    <div className="inline-flex rounded-xl border border-white/25 bg-white/10 p-3 text-zinc-200">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 text-slate-300">{card.text}</p>
                  </article>
                </li>
              ))}
            </ul>

            <div className="mt-16 grid gap-10 rounded-[32px] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-black p-8 md:grid-cols-2 md:items-center md:p-12">
              <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
                <div className="h-64 rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.32),rgba(42,42,42,0.2)_45%,rgba(6,6,6,0.9)_82%)]" />
              </div>
              <div>
                <h3 className="font-display text-4xl font-semibold text-white">We’re obsessed with growth</h3>
                <p className="mt-4 text-lg text-slate-300">
                  Our playbooks are engineered to improve acquisition efficiency while increasing retention and customer
                  lifetime value.
                </p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-zinc-100"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <h2 className="max-w-4xl font-display text-4xl font-semibold text-white md:text-5xl">
              Our team blends strategic depth with execution speed across every stage of the funnel.
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Operators, analysts, and creatives collaborate in one workflow so your campaigns move fast without losing
              quality.
            </p>

            <div id="work" className="mt-14 space-y-10">
              {featureRows.map((row, i) => (
                <article
                  key={row.title}
                  className={`grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2 md:items-center ${
                    i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
                    <div className="h-52 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.3),rgba(208,208,208,0.22),rgba(126,126,126,0.28))]" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-white">{row.title}</h3>
                    <p className="mt-3 text-slate-300">{row.text}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-zinc-200">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">Built for measurable performance</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="style-lab" ref={styleLabRef} className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">Style Lab</p>
                <h3 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                  Choose your landing direction
                </h3>
                <p className="mt-3 max-w-3xl text-slate-300">
                  Compare two visual styles directly on this page. The block below uses GSAP + ScrollTrigger for the
                  text fill effect you shared.
                </p>
              </div>

              <div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setStyleMode("neon")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    styleMode === "neon"
                      ? "landing-gradient-fill text-black"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Monochrome Gradient
                </button>
                <button
                  type="button"
                  onClick={() => setStyleMode("minimal")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    styleMode === "minimal"
                      ? "bg-white text-black"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Minimal Editorial
                </button>
              </div>
            </div>

            <div
              className={`style-scroll-wrap rounded-[28px] border p-6 md:p-10 ${
                styleMode === "neon"
                  ? "style-theme-neon border-white/20 bg-black/50"
                  : "style-theme-minimal border-white/15 bg-[#0d0d0d]"
              }`}
            >
              <div className="style-scroll-container">
                {styleLines.map((line) => (
                  <a key={line} href="#contact" className="scroll-style-text">
                    {line}
                    <span className="scroll-style-overlay">{line}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="rounded-[32px] border border-white/25 landing-gradient-fill p-8 text-black md:p-12">
              <h3 className="font-display text-4xl font-semibold md:text-5xl">Try our strategy sprint for 7 days</h3>
              <p className="mt-3 max-w-2xl text-black/80">
                Drop your email and get a practical growth plan with channel priorities, creative tests, and funnel
                fixes.
              </p>

              <form className="mt-7 grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full rounded-xl border border-black/20 bg-white/80 px-4 py-3 text-black placeholder:text-black/50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white"
                >
                  Try it now
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24 pt-8">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[420px_1fr] lg:items-start">
            <div>
              <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">Let’s scale your brand, together</h2>
              <div className="mt-6 space-y-3 text-slate-300">
                <p className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-zinc-300" />
                  hello@midascreative.com
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-zinc-300" />
                  +1 (555) 123-4567
                </p>
                <p className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-zinc-300" />
                  New York, NY
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-5">
                <div className="flex items-center gap-3 text-slate-100">
                  <Target className="h-5 w-5 text-zinc-300" />
                  <span>Clear growth roadmap</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-slate-100">
                  <LineChart className="h-5 w-5 text-zinc-300" />
                  <span>Measurable KPI framework</span>
                </div>
              </div>
            </div>

            <form
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-black p-7"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 text-sm text-slate-300">Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Type name"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 text-sm text-slate-300">Phone</span>
                  <input
                    type="tel"
                    required
                    placeholder="Type phone number"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 text-sm text-slate-300">Email address</span>
                <input
                  type="email"
                  required
                  placeholder="Type email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
                />
              </label>

              <label className="mt-5 block">
                <span className="mb-2 text-sm text-slate-300">How can we help?</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Type description"
                  className="w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500"
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-xl landing-gradient-fill px-5 py-3 font-semibold text-black"
              >
                Send message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/70">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <a href="#home" className="font-display text-xl font-semibold tracking-[0.12em] text-white">
                MIDAS CREATIVE
              </a>
              <p className="mt-4 text-sm text-slate-400">Follow us on</p>
              <div className="mt-4 flex gap-3">
                {[
                  { label: "IG", href: "#" },
                  { label: "YT", href: "#" },
                  { label: "LI", href: "#" },
                  { label: "GH", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-white hover:text-zinc-200"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-slate-400 transition hover:text-zinc-200">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-slate-500">
          &copy; 2026 MIDAS CREATIVE. All rights reserved.
        </div>
      </footer>

      <a
        href="#top"
        className={`fixed bottom-6 right-6 z-50 rounded-full border border-white/30 landing-gradient-fill p-3 text-black landing-shadow-soft transition ${
          showGoTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </a>

      <style jsx>{`
        .style-scroll-wrap {
          overflow: hidden;
        }

        .style-scroll-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-height: 65vh;
        }

        .scroll-style-text {
          position: relative;
          width: 100%;
          margin: 0;
          font-size: clamp(2.2rem, 8.4vw, 7rem);
          letter-spacing: -0.02em;
          line-height: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(to right, #b6b6b6, #b6b6b6) no-repeat;
          background-clip: text;
          -webkit-background-clip: text;
          color: rgba(182, 182, 182, 0.22);
          background-size: 0% 100%;
          transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;
          display: flex;
          align-items: center;
          padding: 0.36em 0;
          text-decoration: none;
        }

        .scroll-style-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.84);
          color: #0d0d0d;
          clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
          transform-origin: center;
          transition: all cubic-bezier(0.1, 0.5, 0.5, 1) 0.4s;
          padding: 0.36em 0;
        }

        .scroll-style-text:hover > .scroll-style-overlay {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .style-theme-neon .scroll-style-text {
          border-bottom-color: rgba(255, 255, 255, 0.2);
          background-image: linear-gradient(to right, #ffffff, #d6d6d6, #8f8f8f);
          color: rgba(186, 186, 186, 0.34);
        }

        .style-theme-neon .scroll-style-overlay {
          background: linear-gradient(90deg, #ffffff, #d8d8d8, #8e8e8e);
          color: #050505;
        }

        .style-theme-minimal .scroll-style-text {
          border-bottom-color: rgba(255, 255, 255, 0.14);
          background-image: linear-gradient(to right, #b6b6b6, #b6b6b6);
          color: rgba(182, 182, 182, 0.2);
        }

        .style-theme-minimal .scroll-style-overlay {
          background: #ffffff;
          color: #0d0d0d;
        }
      `}</style>
    </div>
  );
}
