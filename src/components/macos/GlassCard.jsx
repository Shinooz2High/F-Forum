import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  featured = false,
  interactive = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-card/85 backdrop-blur-md border border-border/75 hover:border-white/30 rounded-2xl p-6 transition-all duration-300 ${
        featured ? 'border-white/35 shadow-gold-glow' : ''
      } ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
