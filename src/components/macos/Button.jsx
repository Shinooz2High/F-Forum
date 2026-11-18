import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'rose', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconRight: IconRight,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-2xl gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-ff-gold to-amber-500 text-black font-semibold shadow-lg shadow-ff-gold/20 hover:shadow-ff-gold/30 hover:brightness-105 active:brightness-95',
    secondary: 'glass-panel text-neutral-200 hover:text-white hover:border-ff-gold/40 hover:bg-neutral-800/60',
    rose: 'bg-gradient-to-r from-ff-rose to-pink-600 text-white font-semibold shadow-lg shadow-ff-rose/25 hover:brightness-110',
    ghost: 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5',
    outline: 'border border-ff-gold/30 text-ff-gold-light hover:bg-ff-gold/10 hover:border-ff-gold/50',
    glass: 'bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/20 text-neutral-200',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}

      <span>{children}</span>

      {IconRight && !loading && (
        <IconRight className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      )}
    </button>
  );
};
