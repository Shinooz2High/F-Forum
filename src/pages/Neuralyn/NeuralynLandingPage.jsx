import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TESTIMONIAL_TEXT = 
  "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics.";

function ScrollWord({ word, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const color = useTransform(
    scrollYProgress, 
    [start, end], 
    ["hsl(0, 0%, 35%)", "hsl(0, 0%, 100%)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.3em] inline-block font-medium"
    >
      {word}
    </motion.span>
  );
}

export const NeuralynLandingPage = () => {
  const heroRef = useRef(null);
  const testimonialRef = useRef(null);

  // Parallax Scroll for Hero Section
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, -200]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const dashboardY = useTransform(heroScroll, [0, 1], [0, -250]);

  // Scroll-driven word reveal for Testimonial Section
  const { scrollYProgress: testimonialScroll } = useScroll({
    target: testimonialRef,
    offset: ["start end", "end center"]
  });

  const words = TESTIMONIAL_TEXT.split(" ");

  return (
    <div className="bg-[hsl(0,0%,0%)] text-[hsl(0,0%,100%)] min-h-screen font-sans selection:bg-white/20 selection:text-white">
      {/* ================= SECTION 1: HERO ================= */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Navbar */}
        <header className="relative z-30 w-full px-8 md:px-28 py-4 flex items-center justify-between">
          {/* Left: Logo + Text + Nav links */}
          <div className="flex items-center gap-12 md:gap-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img 
                src="/neuralyn/logo.png" 
                alt="Neuralyn Logo" 
                className="w-7 h-7 object-contain group-hover:opacity-80 transition-opacity" 
                onError={(e) => {
                  e.currentTarget.src = "/neuralyn/logo.svg";
                }}
              />
              <span className="text-xl font-bold tracking-tight text-foreground font-sans">
                Neuralyn
              </span>
            </Link>

            {/* Nav links (hidden on mobile, gap-1 between links) */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <a 
                href="#home" 
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Home
              </a>
              <div className="relative group">
                <button 
                  className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <a 
                href="#reviews" 
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Contact us
              </a>
            </nav>
          </div>

          {/* Right: Sign In Button & F-Forum Link */}
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="hidden lg:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono mr-2"
              title="Vào hệ sinh thái F-Forum"
            >
              <span>F-Forum App</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button 
              className="bg-foreground text-background rounded-lg text-sm font-semibold px-4 py-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              onClick={() => alert('Đăng nhập vào hệ thống Neuralyn')}
            >
              Sign In
            </button>
          </div>
        </header>

        {/* Hero Content (Centered column with parallax) */}
        <motion.div 
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-20 flex flex-col items-center text-center mt-12 md:mt-16 px-4 max-w-4xl mx-auto"
        >
          {/* Tag pill: Liquid glass styled */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="liquid-glass px-3 py-2 rounded-lg mb-6 inline-flex items-center cursor-pointer shadow-sm"
          >
            <span className="bg-white text-black rounded-md text-sm font-medium px-2 py-0.5 mr-2.5">
              New
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Say Hello to Corewave v3.2
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl tracking-[-2px] font-medium leading-tight md:leading-[1.15] mb-3 text-foreground"
          >
            Your Insights.<br />
            One Clear <span className="font-serif italic font-normal">Overview</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--hero-subtitle)' }}
            className="text-lg font-normal leading-6 opacity-90 mb-8 max-w-xl mx-auto"
          >
            Neuralyn helps teams track metrics, goals,<br className="hidden sm:inline" /> and progress with precision.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium shadow-xl cursor-pointer hover:opacity-95 transition-all"
              onClick={() => alert('Khởi tạo tài khoản Neuralyn Free Trial')}
            >
              Get Started for Free
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Dashboard + Video Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-screen aspect-video max-h-[620px] mt-6 flex items-center justify-center overflow-hidden"
          style={{ marginLeft: 'calc(-50vw + 50%)' }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          />

          {/* Dashboard image with parallax and luminosity blend */}
          <motion.div
            style={{ y: dashboardY }}
            className="absolute z-10 max-w-5xl w-[90%] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="/neuralyn/hero-dashboard.png"
              alt="Neuralyn Analytics Dashboard"
              style={{ mixBlendMode: 'luminosity' }}
              className="w-full h-auto object-cover rounded-2xl block"
            />
          </motion.div>

          {/* Bottom gradient fade: h-40, from background to transparent, z-30 */}
          <div 
            className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[hsl(0,0%,0%)] via-[hsl(0,0%,0%)/70%] to-transparent z-30 pointer-events-none"
          />
        </motion.div>
      </section>

      {/* ================= SECTION 2: TESTIMONIAL ================= */}
      <section 
        id="reviews"
        ref={testimonialRef}
        className="min-h-screen flex flex-col justify-center items-center py-24 md:py-32 px-8 md:px-28 bg-[hsl(0,0%,0%)] relative z-30"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-start gap-10">
          {/* Quote symbol image */}
          <img 
            src="/neuralyn/quote-symbol.png" 
            alt="Quote Symbol" 
            className="w-14 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.src = "/neuralyn/quote-symbol.svg";
            }}
          />

          {/* Testimonial text with scroll-driven word reveal */}
          <div className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap">
            {words.map((word, idx) => (
              <ScrollWord
                key={idx}
                word={word}
                index={idx}
                total={words.length}
                scrollYProgress={testimonialScroll}
              />
            ))}
            <span className="text-muted-foreground ml-2">"</span>
          </div>

          {/* Author row */}
          <div className="flex items-center gap-4 pt-2">
            <img 
              src="/neuralyn/testimonial-avatar.png" 
              alt="Brooklyn Simmons" 
              className="w-14 h-14 rounded-full border-[3px] border-foreground object-cover shadow-lg"
            />
            <div>
              <p className="text-base font-semibold leading-7 text-foreground font-sans">
                Brooklyn Simmons
              </p>
              <p className="text-sm font-normal leading-5 text-muted-foreground font-sans">
                Product Manager
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER / SWITCHER BAR ================= */}
      <footer className="border-t border-[hsl(0,0%,20%)] py-8 px-8 md:px-28 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>© 2026 Neuralyn SaaS Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-foreground transition-colors">
            F-Forum Platform
          </Link>
          <Link to="/workspace" className="hover:text-foreground transition-colors">
            Workspace Studio
          </Link>
          <Link to="/explore" className="hover:text-foreground transition-colors">
            Explore Templates
          </Link>
        </div>
      </footer>
    </div>
  );
};