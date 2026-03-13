import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Bike,
  Car,
  ChevronDown,
  Droplets,
  Film,
  Layers,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Shield,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ServiceType, useSubmitBooking } from "../hooks/useQueries";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Bike,
    title: "Bike Wash",
    desc: "Thorough cleaning and care for motorcycles and bicycles, removing grime and protecting every surface.",
  },
  {
    icon: Droplets,
    title: "Car Wash",
    desc: "Premium exterior hand wash using pH-neutral soaps and ultra-soft mitts for a flawless, streak-free finish.",
  },
  {
    icon: Sparkles,
    title: "Detailing",
    desc: "Comprehensive bumper-to-bumper detail that restores your vehicle to pristine showroom condition.",
  },
  {
    icon: Wand2,
    title: "Polishing",
    desc: "Professional machine polish removes swirls, scratches and paint defects, revealing a mirror-like finish.",
  },
  {
    icon: Layers,
    title: "Ceramic Coating",
    desc: "Nano-ceramic hydrophobic layer bonds to your paint, delivering brilliant, lasting gloss and protection.",
  },
  {
    icon: Film,
    title: "Window Film",
    desc: "High-performance tint film offers superior UV protection, heat rejection and enhanced privacy.",
  },
  {
    icon: Shield,
    title: "PPF (Paint Protection Film)",
    desc: "Multi-layer film shields your paint from road debris, chips and contaminants with self-healing technology.",
  },
  {
    icon: Car,
    title: "Wrapping",
    desc: "Full or partial premium vinyl wrap transforms your vehicle's appearance with endless colour choices.",
  },
  {
    icon: Package,
    title: "Car Accessories",
    desc: "Premium accessories and bespoke upgrades carefully tailored to complement and elevate your vehicle.",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/before-after-1.dim_800x500.jpg",
    label: "Exterior Restoration",
  },
  {
    src: "/assets/generated/detailing-close.dim_800x500.jpg",
    label: "Ceramic Coating",
  },
  {
    src: "/assets/generated/interior-detail.dim_800x500.jpg",
    label: "Interior Detail",
  },
  {
    src: "/assets/generated/facility.dim_800x500.jpg",
    label: "Our Facility",
  },
];

const SERVICE_OPTIONS = [
  { value: ServiceType.carWashing, label: "Car Wash" },
  { value: ServiceType.bikeWash, label: "Bike Wash" },
  { value: ServiceType.detailing, label: "Detailing" },
  { value: ServiceType.polishing, label: "Polishing" },
  { value: ServiceType.ceramicCoating, label: "Ceramic Coating" },
  { value: ServiceType.windowFilm, label: "Window Film" },
  { value: ServiceType.ppf, label: "PPF (Paint Protection Film)" },
  { value: ServiceType.wrapping, label: "Wrapping" },
  { value: ServiceType.carAccessories, label: "Car Accessories" },
];

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gold-dim" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
      <div className="h-px w-16 bg-gold-dim" />
    </div>
  );
}

function LogoText({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={`font-display font-bold tracking-widest uppercase ${
        size === "sm" ? "text-sm" : "text-lg"
      }`}
    >
      <span className="text-yellow-400">Elite</span>
      <span className="text-white"> Car Care</span>
    </span>
  );
}

export default function EliteCarCare() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "" as ServiceType | "",
    date: "",
    message: "",
  });

  const submitBooking = useSubmitBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.service) {
      toast.error("Please select a service.");
      return;
    }
    try {
      await submitBooking.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service as ServiceType,
        preferredDate: form.date,
        message: form.message,
      });
      toast.success("Booking request submitted! We'll be in touch shortly.");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="Elite Car Care – scroll to top"
          >
            <LogoText />
          </button>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                type="button"
                key={l.href}
                data-ocid="nav.link"
                onClick={() => scrollTo(l.href)}
                className="text-sm tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors duration-200 font-medium"
              >
                {l.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollTo("#contact")}
              className="gradient-gold text-background font-semibold tracking-wider text-xs uppercase px-5 hover:opacity-90 transition-opacity"
            >
              Book Now
            </Button>
          </nav>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border"
            >
              <nav className="flex flex-col px-6 py-4 gap-4">
                {NAV_LINKS.map((l) => (
                  <button
                    type="button"
                    key={l.href}
                    data-ocid="nav.link"
                    onClick={() => scrollTo(l.href)}
                    className="text-sm tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors text-left py-1"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-car.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/20" />
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-medium"
          >
            Premium Automotive Care
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Where Perfection
            <br />
            <span className="text-gradient-gold italic">Meets Passion</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Premium car care services for those who demand the best.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("#contact")}
              className="gradient-gold text-background font-bold tracking-widest uppercase px-10 text-sm hover:opacity-90 transition-all shadow-gold-lg"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("#services")}
              className="border-gold text-gold hover:bg-gold hover:text-background tracking-widest uppercase text-sm transition-all"
            >
              Our Services
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-medium"
            >
              What We Offer
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold"
            >
              Our Services
            </motion.h2>
            <GoldDivider />
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="group bg-card border border-border hover:border-gold-dim rounded-sm p-8 transition-all duration-300 hover:shadow-gold"
              >
                <s.icon className="w-8 h-8 text-gold mb-5" />
                <h3 className="font-display text-xl font-semibold mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        id="gallery"
        className="py-24 px-6"
        style={{ background: "oklch(0.12 0 0)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-medium"
            >
              Our Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold"
            >
              The Gallery
            </motion.h2>
            <GoldDivider />
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            {GALLERY.map((img, i) => (
              <motion.div
                key={img.label}
                variants={fadeUp}
                className={`relative group overflow-hidden rounded-sm ${
                  i === 0 ? "sm:col-span-1 aspect-[4/3]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-px w-8 bg-gold mb-3" />
                  <p className="font-display text-lg font-semibold">
                    {img.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="py-24 px-6"
        style={{ background: "oklch(0.12 0 0)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-medium"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-bold mb-4"
              >
                About Us
              </motion.h2>
              <GoldDivider />
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground leading-relaxed mt-6 mb-8"
              >
                Founded with a singular vision — to deliver concierge-level car
                care with an obsessive commitment to quality. Our team of
                certified detailing experts treats every vehicle as a
                masterpiece, using only the finest products and techniques
                available.
              </motion.p>
              <motion.div variants={stagger} className="grid grid-cols-3 gap-6">
                {[
                  { stat: "10+", label: "Years Experience" },
                  { stat: "5,000+", label: "Cars Detailed" },
                  { stat: "100%", label: "Satisfaction" },
                ].map((item) => (
                  <motion.div
                    key={item.stat}
                    variants={fadeUp}
                    className="text-center"
                  >
                    <p className="font-display text-3xl font-bold text-gradient-gold">
                      {item.stat}
                    </p>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mt-2">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="relative">
              <img
                src="/assets/generated/facility.dim_800x500.jpg"
                alt="Our Facility"
                className="w-full rounded-sm object-cover shadow-gold-lg"
              />
              <div className="absolute inset-0 border border-gold-dim rounded-sm pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-3 font-medium"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-bold"
            >
              Request a Booking
            </motion.h2>
            <GoldDivider />
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  required
                  data-ocid="contact.input"
                  placeholder="James Robertson"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="bg-card border-border focus:border-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </Label>
                <Input
                  required
                  type="email"
                  data-ocid="contact.input"
                  placeholder="james@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="bg-card border-border focus:border-gold transition-colors"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </Label>
                <Input
                  data-ocid="contact.input"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="bg-card border-border focus:border-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Preferred Date
                </Label>
                <Input
                  required
                  type="date"
                  data-ocid="contact.input"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="bg-card border-border focus:border-gold transition-colors"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Service
              </Label>
              <Select
                value={form.service}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, service: v as ServiceType }))
                }
              >
                <SelectTrigger
                  data-ocid="contact.select"
                  className="bg-card border-border focus:border-gold"
                >
                  <SelectValue placeholder="Select a service…" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {SERVICE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Message
              </Label>
              <Textarea
                data-ocid="contact.textarea"
                placeholder="Tell us about your vehicle and any specific concerns…"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="bg-card border-border focus:border-gold transition-colors resize-none"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button
                type="submit"
                size="lg"
                disabled={submitBooking.isPending}
                data-ocid="contact.submit_button"
                className="w-full gradient-gold text-background font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity shadow-gold"
              >
                {submitBooking.isPending ? "Submitting…" : "Request Booking"}
              </Button>
            </motion.div>

            {submitBooking.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="contact.success_state"
                className="border border-gold-dim bg-gold/5 rounded-sm p-4 text-center"
              >
                <p className="text-gold text-sm font-semibold">
                  ✓ Booking Request Submitted
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  We&apos;ll confirm your appointment within 24 hours.
                </p>
              </motion.div>
            )}
            {submitBooking.isError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="contact.error_state"
                className="border border-destructive/50 bg-destructive/10 rounded-sm p-4 text-center"
              >
                <p className="text-destructive text-sm font-semibold">
                  Submission failed. Please try again.
                </p>
              </motion.div>
            )}
          </motion.form>

          {/* Contact info strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid sm:grid-cols-3 gap-6 text-center"
          >
            {[
              { icon: Phone, label: "+91 9954018547" },
              { icon: Mail, label: "hello@elitecarcare.com" },
              { icon: MapPin, label: "Silchar, Assam" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3">
                <c.icon className="w-5 h-5 text-gold" />
                <p className="text-muted-foreground text-sm">{c.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <LogoText size="sm" />
            <p className="text-muted-foreground text-xs mt-1 tracking-wider">
              Where Perfection Meets Passion
            </p>
          </div>
          <div className="flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                type="button"
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-muted-foreground hover:text-gold transition-colors text-xs uppercase tracking-wider"
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-muted-foreground text-xs text-center">
            &copy; {new Date().getFullYear()}. Built with{" "}
            <span className="text-gold">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
