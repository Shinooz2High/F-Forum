import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'rose', 'outline', 'glass'
  size = 'md', // 'xs', 'sm', 'md', 'lg'
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
    xs: 'text-[11px] px-2.5 py-1 rounded-lg gap-1',
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-full gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-foreground text-background font-semibold hover:opacity-90 shadow-sm',
    secondary: 'liquid-glass text-foreground hover:bg-white/[0.06]',
    rose: 'bg-gradient-to-r from-ff-rose to-pink-600 text-white font-semibold shadow-lg shadow-ff-rose/25 hover:brightness-110',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-white/5',
    outline: 'border border-border text-foreground hover:bg-white/10 hover:border-white/40',
    glass: 'liquid-glass text-foreground',
  };

  const iconSize = size === 'xs' || size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className={iconSize} />
      ) : null}

      <span>{children}</span>

      {IconRight && !loading && (
        <IconRight className={iconSize} />
      )}
    </button>
  );
};
