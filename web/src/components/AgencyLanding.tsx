"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Megaphone,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const services = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, narrative, and offer architecture designed to make your category fit obvious.",
    icon: Target,
  },
  {
    title: "Performance Campaigns",
    description:
      "Paid search, social, and conversion optimization with channel-by-channel accountability.",
    icon: Megaphone,
  },
  {
    title: "Content Engine",
    description:
      "Creative systems that ship consistent assets without sacrificing quality or brand intent.",
    icon: PenTool,
  },
  {
    title: "Analytics + Attribution",
    description:
      "Clean data, clear dashboards, and decision-ready insights for faster growth loops.",
    icon: BarChart3,
  },
];

const process = [
  {
    title: "Diagnose",
    summary: "Audit funnel leaks, audience gaps, and channel economics.",
    metric: "14-day sprint",
  },
  {
    title: "Design",
    summary: "Build messaging system, campaign architecture, and offer ladder.",
    metric: "Launch roadmap",
  },
  {
    title: "Deploy",
    summary: "Ship creative, media, and landing page experiments in weekly cycles.",
    metric: "48h iteration",
  },
  {
    title: "Scale",
    summary: "Increase spend by contribution margin and quality pipeline velocity.",
    metric: "Predictable ROI",
  },
];

const featuredCases = [
  {
    name: "Northline Studio",
    focus: "B2B SaaS",
    result: "+212% qualified pipeline",
    detail: "Rebuilt offer stack, tightened paid search intent mapping, and redesigned conversion flow.",
  },
  {
    name: "Kinetic Labs",
    focus: "Consumer Tech",
    result: "-38% customer acquisition cost",
    detail: "Launched UGC ad framework and creative-testing matrix across paid social.",
  },
  {
    name: "Fluxpoint",
    focus: "Fintech",
    result: "+4.7x blended ROAS",
    detail: "Aligned lifecycle messaging with landing pages and retargeting segments.",
  },
];

const trustPoints = [
  "Senior strategists involved weekly, not just during kickoff.",
  "Transparent reporting with owner, action, and due date for each initiative.",
  "Every campaign tied to pipeline, revenue, and margin outcomes.",
];

const easing = [0.22, 1, 0.36, 1] as const;

export function AgencyLanding() {
  const { scrollYProgress } = useScroll();
  const orbShift = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <div className="landing-shell relative min-h-screen overflow-x-clip">
      <motion.div
        className="landing-progress fixed left-0 top-0 z-[90] h-1 w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-28 h-80 w-80 rounded-full bg-white/15 blur-3xl"
          style={{ y: orbShift }}
        />
        <motion.div
          className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -35, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="landing-radial absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-xl font-semibold tracking-[0.12em] text-white">
            MIDAS CREATIVE
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-sm text-slate-300 transition hover:text-white">
              Services
            </a>
            <a href="#process" className="text-sm text-slate-300 transition hover:text-white">
              Process
            </a>
            <a href="#results" className="text-sm text-slate-300 transition hover:text-white">
              Results
            </a>
            <Link href="/case-studies" className="text-sm text-zinc-300 transition hover:text-zinc-200">
              Case Studies
            </Link>
          </nav>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
          >
            Explore Work
          </Link>
        </div>
      </header>

      <main>
        <section className="relative pb-24 pt-20 md:pb-28 md:pt-28">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_520px] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing }}
              className="space-y-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.17em] text-zinc-200">
                <Sparkles className="h-3.5 w-3.5" />
                Growth Marketing Agency
              </span>

              <h1 className="font-display text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                We build brands that look sharp,
                <span className="landing-gradient-text mt-2 block">
                  perform hard, and scale fast.
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Strategy, creative, media, and measurement in one operating system for teams that care about
                profitable growth.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/case-studies"
                  className="landing-gradient-fill inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition hover:brightness-110"
                >
                  View Case Studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  See Services
                </a>
              </div>

              <div className="grid max-w-xl gap-4 sm:grid-cols-3">
                {[
                  { value: "180+", label: "Campaigns launched" },
                  { value: "4.9x", label: "Average ROAS" },
                  { value: "93%", label: "Client retention" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-4"
                  >
                    <p className="font-display text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: easing }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-900/85 to-black p-7"
            >
              <div className="absolute -left-10 -top-12 h-36 w-36 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-12 right-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

              <div className="relative mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Pipeline Velocity</p>
                  <p className="font-display text-3xl font-semibold text-white">+194% QoQ</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-white/15 p-3 text-zinc-200">
                  <Rocket className="h-5 w-5" />
                </div>
              </div>

              <div className="relative flex h-56 items-end gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                {[38, 48, 44, 68, 58, 84, 76].map((height, i) => (
                  <motion.div
                    key={`${height}-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${height}%`, opacity: 1 }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.75, delay: i * 0.08, ease: easing }}
                    className="w-full rounded-t-md bg-gradient-to-b from-white to-zinc-500"
                  />
                ))}
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">CAC</p>
                  <p className="mt-1 text-xl font-semibold text-white">-35%</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Lead Quality</p>
                  <p className="mt-1 text-xl font-semibold text-white">+57%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easing }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">Services</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                Full-funnel execution with design-grade creative and data-grade rigor.
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {services.map((service, i) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: easing }}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/85 to-black p-7"
                >
                  <div className="mb-5 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-200">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-300">{service.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: easing }}
              className="rounded-[32px] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-black px-7 py-10 md:px-12 md:py-14"
            >
              <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">How We Work</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                    Fast execution, controlled experiments, measurable outcomes.
                  </h2>

                  <div className="mt-7 space-y-4">
                    {trustPoints.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-zinc-300" />
                        <p className="text-slate-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Attribution coverage", value: "97%", icon: Search },
                    { label: "Launch cycle", value: "11 days", icon: Rocket },
                    { label: "Creative velocity", value: "22/wk", icon: Sparkles },
                    { label: "Brand safety", value: "Enterprise", icon: ShieldCheck },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: easing }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <item.icon className="h-5 w-5 text-zinc-300" />
                      <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                      <p className="mt-1 font-display text-2xl font-semibold text-white">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="results" className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: easing }}
              className="mb-12 flex flex-wrap items-end justify-between gap-4"
            >
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">Featured Results</p>
                <h2 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
                  Real case studies. Real numbers. Real operating improvements.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/20"
              >
                Open Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {featuredCases.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: easing }}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/85 to-black p-7"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-300">{item.focus}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-3 text-lg font-semibold text-zinc-200">{item.result}</p>
                  <p className="mt-3 leading-relaxed text-slate-300">{item.detail}</p>
                  <Link
                    href="/case-studies"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 transition hover:text-zinc-100"
                  >
                    Read Full Case
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.map((step, i) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: easing }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">Step {i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-300">{step.summary}</p>
                  <p className="mt-5 font-semibold text-zinc-200">{step.metric}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 pt-8 md:pb-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: easing }}
              className="landing-gradient-fill relative overflow-hidden rounded-[32px] border border-white/25 p-10 md:p-14"
            >
              <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-white/35 blur-3xl" />
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900/70">Ready to Scale</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                Want your next campaign to look better and convert harder? Start with case studies.
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Open Case Studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="rounded-2xl border border-slate-900/30 bg-white/25 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/40"
                >
                  Review Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p className="font-medium tracking-[0.1em] text-white">MIDAS CREATIVE</p>
          <p>hello@midascreative.com</p>
          <p>New York, NY</p>
        </div>
      </footer>
    </div>
  );
}
