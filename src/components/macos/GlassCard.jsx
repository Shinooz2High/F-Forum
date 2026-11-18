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
      className={`glass-card rounded-2xl p-6 ${
        featured ? 'border-ff-gold/40 shadow-gold-glow/20' : ''
      } ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
