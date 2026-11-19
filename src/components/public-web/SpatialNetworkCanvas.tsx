import { useEffect, useRef, useState } from "react";

interface SpatialNetworkCanvasProps {
  theme?: "light" | "dark";
  reducedMotion?: boolean;
  className?: string;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
}

/**
 * Adapted from SOURCEOFKNOWLEDGFORAI -> threeui/section-agent-ai-network &
 * section-workshop-codex-chapters.
 * Enforces strict desktop performance budget: auto-downgrades to a static
 * SVG spatial constellation on mobile (<768px), <=4 logical cores, or reducedMotion.
 */
export function SpatialNetworkCanvas({
  theme = "light",
  reducedMotion = false,
  className = "",
}: SpatialNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [allowMotion3D, setAllowMotion3D] = useState(false);

  useEffect(() => {
    const checkBudget = () => {
      if (reducedMotion) return setAllowMotion3D(false);
      if (typeof window === "undefined") return setAllowMotion3D(false);
      const desktop = window.innerWidth >= 768;
      const cores = navigator.hardwareConcurrency ?? 8;
      setAllowMotion3D(desktop && cores > 4);
    };
    checkBudget();
    window.addEventListener("resize", checkBudget);
    return () => window.removeEventListener("resize", checkBudget);
  }, [reducedMotion]);

  useEffect(() => {
    if (!allowMotion3D) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));
    const dpr = window.devicePixelRatio || 1;
    let pointerX = 0;
    let pointerY = 0;

    const nodes: Node3D[] = Array.from({ length: 34 }, (_, i) => {
      const angle = (i / 34) * Math.PI * 2;
      const spread = 180 + (i % 4) * 55;
      return {
        x: Math.cos(angle) * spread,
        y: Math.sin(angle * 1.4) * (spread * 0.45),
        z: ((i % 7) - 3) * 48,
        vx: (Math.sin(i * 1.7) * 0.16),
        vy: (Math.cos(i * 1.3) * 0.14),
        vz: (Math.sin(i * 0.9) * 0.12),
        r: i % 5 === 0 ? 3.2 : 2.1,
      };
    });

    const onResize = () => {
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      width = canvas.width = canvas.offsetWidth * ratio;
      height = canvas.height = canvas.offsetHeight * ratio;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 48;
      pointerY = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 32;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + pointerX * 0.45 * dpr;
      const cy = height / 2 + pointerY * 0.45 * dpr;
      const focal = 480;

      const dotRgb = theme === "dark" ? "147, 197, 253" : "37, 99, 235";
      const lineRgb = theme === "dark" ? "255, 255, 255" : "20, 21, 23";

      const projected = nodes.map((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        if (Math.abs(n.x) > 360) n.vx *= -1;
        if (Math.abs(n.y) > 200) n.vy *= -1;
        if (Math.abs(n.z) > 170) n.vz *= -1;

        const scale = focal / (focal + n.z + 220);
        return {
          px: cx + n.x * scale * dpr,
          py: cy + n.y * scale * dpr,
          scale,
          r: n.r * scale * dpr,
        };
      });

      // Edges
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.hypot(dx, dy);
          if (dist < 145 * dpr) {
            const alpha = (1 - dist / (145 * dpr)) * (theme === "dark" ? 0.14 : 0.09);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of projected) {
        ctx.fillStyle = `rgba(${dotRgb}, ${(0.25 + p.scale * 0.45).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [allowMotion3D, theme]);

  if (!allowMotion3D) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none ${className}`}
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(circle at 50% 35%, rgba(96, 165, 250, 0.14), transparent 58%)"
              : "radial-gradient(circle at 50% 35%, rgba(37, 99, 235, 0.09), transparent 58%)",
        }}
      >
        <svg className="w-full h-full opacity-35" viewBox="0 0 800 320" fill="none">
          <circle cx="400" cy="160" r="110" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="4 6" />
          <circle cx="400" cy="160" r="185" stroke="currentColor" strokeOpacity="0.09" strokeDasharray="2 8" />
          <circle cx="290" cy="110" r="3" fill="#3B82F6" fillOpacity="0.65" />
          <circle cx="510" cy="115" r="3" fill="#3B82F6" fillOpacity="0.65" />
          <circle cx="445" cy="240" r="3" fill="#3B82F6" fillOpacity="0.65" />
          <path d="M290 110 L510 115 L445 240 Z" stroke="currentColor" strokeOpacity="0.12" />
        </svg>
      </div>
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}

export default SpatialNetworkCanvas;
