import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import {
  Sparkles, Zap, Cpu, Wand2, LineChart, Layers, ArrowRight, Play,
  Star, Quote, Check, Plus, Minus, Mail, ArrowUpRight, Twitter, Github, Linkedin, Dribbble,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import heroRobot from "@/assets/hero-robot.png";
import orb3d from "@/assets/orb-3d.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — AI-Powered Digital Experiences That Convert" },
      { name: "description", content: "Award-winning AI web design studio crafting cinematic, conversion-focused digital products for ambitious brands." },
      { property: "og:title", content: "NOVA — AI-Powered Digital Experiences" },
      { property: "og:description", content: "Cinematic, conversion-focused digital products engineered with AI." },
    ],
  }),
  component: Index,
});

/* ============ shared variants ============ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(18px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ============ Magnetic Button ============ */
function MagneticButton({
  children, variant = "primary", className = "", onClick,
}: { children: React.ReactNode; variant?: "primary" | "ghost"; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const base = "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide overflow-hidden transition-shadow";
  const styles = variant === "primary"
    ? "text-primary-foreground"
    : "text-foreground glass hover:bg-white/10";

  return (
    <motion.button
      ref={ref}
      type={onClick ? "button" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`group ${base} ${styles} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 animate-soft-pulse" style={{ background: "var(--gradient-primary)" }} />
      )}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.25), transparent)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* ============ Background Layer ============ */
function CosmicBackground() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-40 animate-drift"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.27 350 / 0.6), transparent 70%)" }} />
      <div className="absolute top-1/3 -right-40 h-[700px] w-[700px] rounded-full blur-3xl opacity-30 animate-drift-slow"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 290 / 0.6), transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full blur-3xl opacity-25 animate-drift"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.20 200 / 0.5), transparent 70%)" }} />
      <div ref={cursor} className="absolute h-[500px] w-[500px] rounded-full blur-3xl opacity-20 transition-transform duration-300"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.27 350 / 0.4), transparent 70%)" }} />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}

/* ============ Floating Particles ============ */
function Particles({ count = 30 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 10) * 0.6;
        const duration = 8 + (i % 6);
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 h-1 w-1 rounded-full"
            style={{ left: `${left}%`, background: i % 2 ? "var(--neon-pink)" : "var(--neon-cyan)", boxShadow: "0 0 8px currentColor" }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -800, opacity: [0, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

/* ============ Nav ============ */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,95vw)]"
    >
      <div className="glass-strong rounded-full px-5 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-heading text-xl">
          <span className="h-7 w-7 rounded-full" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }} />
          <span className="text-gradient">NOVA</span>
        </a>
        <motion.nav initial="hidden" animate="show" variants={stagger} className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {["Services", "Work", "Process", "Pricing", "Contact"].map((l) => (
            <motion.a key={l} href={`#${l.toLowerCase()}`} variants={fadeRight}
              whileHover={{ y: -2, scale: 1.02 }}
              className="relative hover:text-foreground transition-colors"
            >
              {l}
            </motion.a>
          ))}
        </motion.nav>
        <MagneticButton onClick={() => setOpen(true)}>
          Start a Project <ArrowRight className="h-4 w-4" />
        </MagneticButton>
      </div>
      <ContactDialog open={open} onOpenChange={setOpen} />
    </motion.header>
  );
}

/* ============ Contact Dialog ============ */
function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl">
            Let's build something <span className="text-gradient">iconic</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your project. We respond within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-2" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); }}>
          <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
          <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Email address" type="email" />
          <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Project details, budget, timeline..." />
          <MagneticButton>Send Message <ArrowRight className="h-4 w-4" /></MagneticButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ============ Hero ============ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [contactOpen, setContactOpen] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);

  const words = ["We", "Build", "AI-Powered", "Digital", "Experiences", "That", "Convert."];

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden vignette">
      <Particles count={24} />
      <motion.div style={{ y, opacity }} className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] mb-8">
            <Sparkles className="h-3 w-3 text-primary" /> AI Web Design Studio · Est. 2024
          </motion.div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-8">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-3 ${w === "AI-Powered" || w === "Convert." ? "text-gradient italic" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            We blend generative AI, cinematic motion, and conversion science to ship digital products
            that feel like the future — and perform like it.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, type: "spring" }}
            className="flex flex-wrap gap-4 mb-16">
            <MagneticButton onClick={() => setContactOpen(true)}>Start a Project <ArrowRight className="h-4 w-4" /></MagneticButton>
            <MagneticButton variant="ghost" onClick={() => setReelOpen(true)}><Play className="h-4 w-4" /> View Showreel</MagneticButton>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger} className="grid grid-cols-3 gap-4 max-w-xl">
            {[
              { v: "240+", l: "Projects Shipped" },
              { v: "$120M", l: "Client Revenue" },
              { v: "18", l: "Awwwards" },
            ].map((s) => (
              <motion.div key={s.l} variants={fadeUp}
                whileHover={{ y: -6, rotate: -1 }}
                className="glass rounded-2xl p-4 text-center animate-float-y">
                <div className="font-heading text-3xl text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.2 }}
          className="relative h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse-glow"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.27 350 / 0.5), transparent 60%)" }} />
          <motion.img
            src={heroRobot} alt="AI Intelligence" width={1024} height={1024}
            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_60px_oklch(0.72_0.27_350_/_0.5)]"
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img src={orb3d} alt="" width={200} height={200}
            className="absolute top-10 -left-4 w-24 h-24 object-contain"
            animate={{ y: [0, 30, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div className="absolute bottom-12 right-4 glass-strong rounded-2xl p-4 w-48"
            animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Engagement</div>
            <div className="font-heading text-2xl text-gradient">+342%</div>
            <div className="h-1 mt-2 rounded-full overflow-hidden bg-white/10">
              <motion.div className="h-full" style={{ background: "var(--gradient-primary)" }}
                initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1.8, duration: 1.5 }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
        <motion.div className="h-10 w-px" style={{ background: "linear-gradient(180deg, var(--neon-pink), transparent)" }}
          animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <Dialog open={reelOpen} onOpenChange={setReelOpen}>
        <DialogContent className="glass-strong border-white/10 max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Showreel</DialogTitle>
            <DialogDescription>NOVA studio showreel</DialogDescription>
          </DialogHeader>
          <div className="relative w-full aspect-video bg-black">
            {reelOpen && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Showreel"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ============ Logos ============ */
function Logos() {
  const logos = ["TESLA", "STRIPE", "FIGMA", "NOTION", "VERCEL", "LINEAR", "ARC", "FRAMER"];
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Trusted by category-defining teams</p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 z-10" style={{ background: "linear-gradient(90deg, var(--background), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10" style={{ background: "linear-gradient(-90deg, var(--background), transparent)" }} />
        <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((l, i) => (
            <motion.span key={i} whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="font-heading text-3xl text-muted-foreground/60 hover:text-gradient transition-colors">
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Section wrapper ============ */
function Section({ id, eyebrow, title, sub, children }: {
  id?: string; eyebrow?: string; title?: React.ReactNode; sub?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section id={id} ref={ref} className="relative py-28 lg:py-36">
      <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
        className="container mx-auto px-6">
        {(eyebrow || title) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {eyebrow && (
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] mb-6">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--neon-pink)" }} />
                {eyebrow}
              </motion.div>
            )}
            {title && <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight">{title}</motion.h2>}
            {sub && <motion.p variants={fadeUp} className="text-muted-foreground mt-5 text-lg">{sub}</motion.p>}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

/* ============ Services ============ */
function Services() {
  const items = [
    { icon: Wand2, t: "AI Brand Identity", d: "Generative visual systems that adapt across every touchpoint with bespoke craft." },
    { icon: Cpu, t: "Web Design & Build", d: "Cinematic marketing sites engineered in Next.js, Framer, and React." },
    { icon: Layers, t: "Product UX", d: "End-to-end SaaS interfaces from research and prototyping through ship." },
    { icon: Sparkles, t: "Motion & 3D", d: "Frame-by-frame interaction design, WebGL scenes, and shader work." },
    { icon: LineChart, t: "Conversion Science", d: "Experimentation systems that compound revenue post-launch." },
    { icon: Zap, t: "AI Integration", d: "Custom GPT agents, RAG search, and AI workflows shipped to production." },
  ];
  return (
    <Section id="services" eyebrow="What we do" title={<>Studio services for the <span className="text-gradient italic">AI era</span></>} sub="Six disciplines, one cinematic standard. Pick the suite that fits your stage.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div key={it.t} variants={fadeUp}
            whileHover={{ y: -8, rotate: -1, scale: 1.02 }}
            className="group relative glass rounded-3xl p-7 overflow-hidden border-gradient">
            <motion.div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.72 0.27 350 / 0.18), transparent 50%)" }} />
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 glow-pink"
              style={{ background: "var(--gradient-primary)" }}>
              <it.icon className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div className="text-xs text-muted-foreground mb-2 font-mono">0{i + 1}</div>
            <h3 className="font-heading text-2xl mb-3">{it.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            <ArrowUpRight className="absolute top-7 right-7 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ Portfolio ============ */
const works = [
  { t: "Helix.ai", cat: "SaaS · Web", color: "from-fuchsia-500 to-rose-500", span: "lg:col-span-2 lg:row-span-2", h: "h-full" },
  { t: "Lunar Bank", cat: "Fintech · Brand", color: "from-cyan-400 to-blue-600", span: "lg:col-span-1", h: "h-72" },
  { t: "Orbit OS", cat: "Product UX", color: "from-violet-500 to-pink-500", span: "lg:col-span-1", h: "h-72" },
  { t: "Nebula Studio", cat: "Creative · 3D", color: "from-pink-500 to-orange-400", span: "lg:col-span-2", h: "h-80" },
  { t: "Vertex AI", cat: "AI · Platform", color: "from-indigo-500 to-fuchsia-500", span: "lg:col-span-1", h: "h-80" },
];
function Portfolio() {
  const [active, setActive] = useState<typeof works[number] | null>(null);
  return (
    <Section id="work" eyebrow="Selected work" title={<>Bento of <span className="text-gradient italic">recent obsessions</span></>}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 auto-rows-[18rem]">
        {works.map((w, i) => (
          <motion.button
            key={w.t}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            onClick={() => setActive(w)}
            className={`group relative ${w.span} ${w.h} rounded-3xl overflow-hidden glass text-left border-gradient`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${w.color} opacity-40 group-hover:opacity-70 transition-opacity duration-700`} />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <motion.div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full blur-3xl"
              style={{ background: "oklch(0.72 0.27 350 / 0.4)" }}
              animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">{w.cat}</div>
              <div className="font-heading text-3xl lg:text-4xl text-white">{w.t}</div>
              <div className="flex items-center gap-2 mt-3 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                View case study <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="glass-strong border-white/10 max-w-3xl">
          <DialogHeader>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{active?.cat}</div>
            <DialogTitle className="font-heading text-4xl text-gradient">{active?.t}</DialogTitle>
          </DialogHeader>
          <div className={`h-72 rounded-2xl bg-gradient-to-br ${active?.color} relative overflow-hidden mb-4`}>
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            A cinematic relaunch built on a custom design system, scroll-driven 3D, and a content platform that compounds.
            Outcomes: +212% activation, –38% bounce, 9.4/10 brand recall in post-launch study.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {["+212%", "9.4/10", "12wk"].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="text-gradient font-heading text-2xl">{s}</div>
                <div className="text-xs text-muted-foreground mt-1">{["Activation", "Brand recall", "Timeline"][i]}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ============ Process ============ */
function Process() {
  const steps = [
    { n: "01", t: "Discover", d: "Strategy workshops, audit, audience research, north-star vision." },
    { n: "02", t: "Design", d: "Cinematic concept work, design system, interaction prototypes." },
    { n: "03", t: "Build", d: "Production engineering in Next.js, motion choreography, QA." },
    { n: "04", t: "Evolve", d: "Experimentation, analytics, AI-assisted iteration loops." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <Section id="process" eyebrow="The Process" title={<>Four moves, <span className="text-gradient italic">zero waste</span></>}>
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
        <motion.div style={{ height: lineH }} className="absolute left-8 top-0 w-px hidden md:block"
          //
        >
          <div className="h-full w-full" style={{ background: "linear-gradient(180deg, var(--neon-pink), var(--neon-violet), var(--neon-cyan))", boxShadow: "0 0 20px var(--neon-pink)" }} />
        </motion.div>
        <div className="space-y-10">
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="relative md:pl-24">
              <motion.div className="absolute left-0 top-2 h-16 w-16 rounded-2xl glass-strong items-center justify-center hidden md:flex"
                whileHover={{ scale: 1.1, rotate: 6 }} style={{ boxShadow: "var(--shadow-glow)" }}>
                <span className="font-heading text-xl text-gradient">{s.n}</span>
              </motion.div>
              <div className="glass rounded-3xl p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:hidden mb-2">{s.n}</div>
                <h3 className="font-heading text-3xl mb-2">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============ Testimonials ============ */
function Testimonials() {
  const items = [
    { q: "NOVA didn't just redesign our site, they reframed how the market sees us. The motion work alone made it on every founder Slack we touch.", a: "Maya Chen", r: "Founder, Helix.ai" },
    { q: "Cinema. That's the only word. Conversion up 212% in eight weeks, brand recall through the roof.", a: "Andre Park", r: "CMO, Lunar Bank" },
    { q: "The AI integration roadmap they built shipped six features we'd been stuck on for a year.", a: "Priya Rao", r: "VP Product, Vertex" },
    { q: "Worth every cent. They operate at the intersection of agency, studio, and engineering team.", a: "Tomás Reyes", r: "CEO, Nebula" },
  ];
  return (
    <Section eyebrow="Testimonials" title={<>Founders, on the <span className="text-gradient italic">record</span></>}>
      <div className="relative">
        <motion.div className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x" dragConstraints={{ left: -1200, right: 0 }}>
          {items.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="min-w-[340px] sm:min-w-[420px] glass rounded-3xl p-8 border-gradient">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg leading-relaxed mb-6">"{t.q}"</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full p-[2px]" style={{ background: "var(--gradient-primary)" }}>
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-heading text-lg">
                    {t.a[0]}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-primary text-primary" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ============ Pricing ============ */
function Counter({ to, prefix = "$" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v.toLocaleString()}</span>;
}
function Pricing() {
  const plans = [
    { n: "Starter", p: 8000, d: "Landing site sprint", feats: ["1 page cinematic build", "Brand-aligned motion", "2 revision rounds", "2-week delivery"], pop: false },
    { n: "Growth", p: 24000, d: "Full marketing site", feats: ["Up to 8 pages", "Design system + CMS", "Custom 3D & WebGL", "Conversion experiments", "8-week delivery"], pop: true },
    { n: "Enterprise", p: 60000, d: "Product + brand system", feats: ["Unlimited surfaces", "AI integration roadmap", "Dedicated motion team", "Quarterly evolution", "Ongoing partnership"], pop: false },
  ];
  return (
    <Section id="pricing" eyebrow="Pricing" title={<>Three ways to <span className="text-gradient italic">work with us</span></>}>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((p, i) => (
          <motion.div key={p.n}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`relative glass-strong rounded-3xl p-8 ${p.pop ? "animate-pulse-glow border-gradient" : "border border-white/10"}`}
            style={p.pop ? { background: "linear-gradient(135deg, oklch(0.72 0.27 350 / 0.12), oklch(0.55 0.25 290 / 0.08))" } : {}}
          >
            {p.pop && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--gradient-primary)" }}>
                Most popular
              </div>
            )}
            <div className="font-heading text-2xl mb-1">{p.n}</div>
            <div className="text-sm text-muted-foreground mb-6">{p.d}</div>
            <div className="font-heading text-5xl mb-1"><Counter to={p.p} /></div>
            <div className="text-xs text-muted-foreground mb-6">starting · USD</div>
            <ul className="space-y-3 mb-8">
              {p.feats.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <MagneticButton variant={p.pop ? "primary" : "ghost"} className="w-full">
              Choose {p.n} <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const items = [
    { q: "How long does a typical project take?", a: "Most marketing sites land in 6–10 weeks. Product UX work runs 10–16 weeks. We give a fixed timeline after discovery." },
    { q: "Do you work with early-stage startups?", a: "Yes — we reserve a quarterly slot for ambitious pre-seed and seed teams. Equity-adjusted engagements available." },
    { q: "Can you handle development too?", a: "Always. Design and engineering happen in the same room: Next.js, React, Framer Motion, Three.js, and edge stacks." },
    { q: "What about ongoing iteration?", a: "Our Evolve retainer keeps the site shipping new experiments every two weeks with motion, copy, and AI-assisted optimization." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section eyebrow="Questions" title={<>Things we're <span className="text-gradient italic">often asked</span></>}>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((it, i) => (
          <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.01 }} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
              <span className="font-heading text-xl">{it.q}</span>
              {open === i ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ Final CTA ============ */
function FinalCTA() {
  const [open, setOpen] = useState(false);
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <Particles count={40} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative max-w-5xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden border-gradient glass-strong">
          <div className="absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.72 0.27 350 / 0.35), transparent 60%)" }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] mb-8">
              <Mail className="h-3 w-3 text-primary" /> Now booking Q3
            </div>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95]">
              Let's build something <span className="text-gradient italic">iconic</span>.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Two slots left this quarter. Tell us where you're headed — we'll tell you how to get there cinematically.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton onClick={() => setOpen(true)}>Start a Project <ArrowRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton variant="ghost">hello@nova.studio</MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
      <ContactDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}

/* ============ Footer ============ */
function Footer() {
  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="relative pt-20 pb-10 border-t border-white/5 overflow-hidden">
      <motion.div className="absolute top-0 left-0 h-px"
        initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
        transition={{ duration: 1.6 }}
        style={{ background: "linear-gradient(90deg, transparent, var(--neon-pink), var(--neon-cyan), transparent)" }} />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-16">
          <div>
            <a href="#top" className="flex items-center gap-2 font-heading text-2xl mb-4">
              <span className="h-8 w-8 rounded-full glow-pink" style={{ background: "var(--gradient-primary)" }} />
              <span className="text-gradient">NOVA</span>
            </a>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              AI-powered design studio building cinematic digital experiences from Brooklyn, Lisbon, and Tokyo.
            </p>
          </div>
          {[
            { h: "Studio", l: ["Services", "Work", "Process", "Careers"] },
            { h: "Resources", l: ["Journal", "Press kit", "Manifesto", "Contact"] },
            { h: "Legal", l: ["Privacy", "Terms", "Imprint", "Cookies"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{c.h}</div>
              <ul className="space-y-2 text-sm">
                {c.l.map((x) => <li key={x}><a href="#" className="hover:text-gradient transition-colors">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} NOVA Studio · Crafted with motion in mind.</p>
          <div className="flex gap-3">
            {[Twitter, Github, Linkedin, Dribbble].map((I, i) => (
              <motion.a key={i} href="#" whileHover={{ scale: 1.15, rotate: 6 }}
                className="h-10 w-10 rounded-full glass flex items-center justify-center hover:glow-pink transition-shadow">
                <I className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

/* ============ Page ============ */
function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <CosmicBackground />
      <Nav />
      <Hero />
      <Logos />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
