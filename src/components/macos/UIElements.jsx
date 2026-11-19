import React from 'react';

export const Badge = ({ children, variant = 'gold', size = 'sm', className = '' }) => {
  const styles = {
    gold: 'bg-white/10 text-foreground border-white/20',
    cyan: 'bg-white/10 text-neutral-200 border-white/20',
    jade: 'bg-ff-jade/10 text-ff-jade border-ff-jade/30',
    rose: 'bg-ff-rose/10 text-ff-rose border-ff-rose/30',
    blue: 'bg-ff-blue/10 text-blue-400 border-blue-500/30',
    neutral: 'bg-neutral-900 text-neutral-300 border-border',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${styles[variant] || styles.gold} ${sizes[size] || sizes.sm} ${className}`}>
      {children}
    </span>
  );
};

export const Tag = ({ children, active = false, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all select-none cursor-pointer ${
        active 
          ? 'bg-foreground text-background font-semibold shadow-sm' 
          : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const Avatar = ({ name = 'User', src, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img 
        src={src} 
        alt={name} 
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white/30 ${className}`} 
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-foreground text-background font-bold flex items-center justify-center ring-2 ring-white/30 select-none shadow-sm ${className}`}>
      {initials}
    </div>
  );
};

export const Input = ({ icon: Icon, error, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        className={`w-full rounded-xl bg-card border border-border text-foreground placeholder-neutral-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 transition-all ${
          Icon ? 'pl-10' : 'pl-3.5'
        } pr-4 py-2.5 ${error ? 'border-ff-rose focus:border-ff-rose focus:ring-ff-rose/30' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-ff-rose mt-1">{error}</p>}
    </div>
  );
};

export const ProgressBar = ({ progress = 0, label, showPercent = true, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-mono">
          <span>{label}</span>
          {showPercent && <span>{Math.round(progress)}%</span>}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
        <div 
          className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 p-1 rounded-xl bg-card border border-border backdrop-blur-md ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all select-none cursor-pointer ${
            activeTab === tab.id
              ? 'bg-foreground text-background font-semibold shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
          <span>{tab.label}</span>
          {tab.badge && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === tab.id ? 'bg-black/15 text-black' : 'bg-white/15 text-foreground'
            }`}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
