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
      className={`bg-card/90 backdrop-blur-md border border-border hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 shadow-sm ${
        featured ? 'border-blue-500/40 shadow-md' : ''
      } ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
