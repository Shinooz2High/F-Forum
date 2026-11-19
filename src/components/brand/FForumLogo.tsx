import { motion, type Transition } from "motion/react";

export interface FForumLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
  strokeColor?: string;
  accentColor?: string;
}

const PLATE_SPRING: Transition = { type: "spring", stiffness: 420, damping: 28 };

/**
 * F-FORUM Kinetic Geometric Monogram:
 * Three interlocking precision architectural plates forming an origami "F"
 * inside a calibrated chamfered frame — inspired by PinUI & SOURCEOFKNOWLEDGE
 * Swiss-spatial design principles. Works in both Paper Light & Graphite Dark.
 */
export function FForumLogo({
  size = 28,
  animated = true,
  className = "",
  strokeColor = "currentColor",
  accentColor = "#2563EB",
}: FForumLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={false}
      whileHover={animated ? "hover" : undefined}
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Calibrated chamfered studio frame */}
      <motion.path
        d="M6.5 3.5H27.5L32.5 8.5V29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H6.5C4.84315 32.5 3.5 31.1569 3.5 29.5V6.5C3.5 4.84315 4.84315 3.5 6.5 3.5Z"
        stroke={strokeColor}
        strokeOpacity={0.22}
        strokeWidth="1.5"
        variants={{
          hover: { strokeOpacity: 0.45 },
        }}
        transition={PLATE_SPRING}
      />

      {/* Plate 1: Vertical Architectural Spine */}
      <motion.path
        d="M11 9.5C11 8.94772 11.4477 8.5 12 8.5H15.2C15.7523 8.5 16.2 8.94772 16.2 9.5V26.5C16.2 27.0523 15.7523 27.5 15.2 27.5H12C11.4477 27.5 11 27.0523 11 26.5V9.5Z"
        fill={strokeColor}
        variants={{
          hover: { x: -0.8 },
        }}
        transition={PLATE_SPRING}
      />

      {/* Plate 2: Top Cantilever Beam */}
      <motion.path
        d="M14.5 8.5H25.2C25.95 8.5 26.4 9.32 26 9.96L23.9 13.1C23.68 13.43 23.31 13.63 22.91 13.63H14.5V8.5Z"
        fill={strokeColor}
        variants={{
          hover: { x: 1.2, y: -0.6 },
        }}
        transition={PLATE_SPRING}
      />

      {/* Plate 3: Kinetic Signal Core (Middle Bar + Focal Dot) */}
      <motion.rect
        x="14.5"
        y="16.2"
        width="7.8"
        height="4.6"
        rx="1.2"
        fill={accentColor}
        variants={{
          hover: { x: 1.8, scaleX: 1.08 },
        }}
        transition={PLATE_SPRING}
      />
      <motion.circle
        cx="25.8"
        cy="24.2"
        r="2.1"
        fill={strokeColor}
        fillOpacity={0.35}
        variants={{
          hover: { scale: 1.25, fillOpacity: 0.85 },
        }}
        transition={PLATE_SPRING}
      />
    </motion.svg>
  );
}

export default FForumLogo;
