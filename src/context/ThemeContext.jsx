import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  reducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {},
  authUser: null,
  signInUser: () => {},
  signOutUser: () => {},
  simulateOffline: false,
  setSimulateOffline: () => {},
  acceptedTerms: false,
  acceptTerms: () => {},
});

const readSavedTheme = () => {
  try {
    const v2 = localStorage.getItem('ff_theme_v2');
    if (v2 === 'light' || v2 === 'dark') return v2;
  } catch {
    // ignore
  }
  return 'light';
};

const readReducedMotion = () => {
  try {
    const saved = localStorage.getItem('ff_reduced_motion');
    if (saved === 'true') return true;
    if (saved === 'false') return false;
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

const readAuthUser = () => {
  try {
    const raw = localStorage.getItem('ff_auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readSavedTheme);
  const [reducedMotion, setReducedMotion] = useState(readReducedMotion);
  const [authUser, setAuthUser] = useState(readAuthUser);
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(() => {
    try {
      return localStorage.getItem('ff_terms_v1') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ff_theme_v2', theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0B0C10' : '#F4F2EE');
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('ff_reduced_motion', String(reducedMotion));
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false');
  }, [reducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const signInUser = (user) => {
    const normalized = {
      name: user?.name || user?.email?.split('@')[0] || 'Thành viên Studio',
      email: user?.email || 'member@f-forum.studio',
      provider: user?.provider || 'studio',
      signedInAt: Date.now(),
    };
    setAuthUser(normalized);
    try {
      localStorage.setItem('ff_auth_user', JSON.stringify(normalized));
    } catch {
      // ignore
    }
  };

  const signOutUser = () => {
    setAuthUser(null);
    try {
      localStorage.removeItem('ff_auth_user');
    } catch {
      // ignore
    }
  };

  const acceptTerms = () => {
    setAcceptedTerms(true);
    try {
      localStorage.setItem('ff_terms_v1', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        reducedMotion,
        toggleReducedMotion,
        setReducedMotion,
        authUser,
        signInUser,
        signOutUser,
        simulateOffline,
        setSimulateOffline,
        acceptedTerms,
        acceptTerms,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
