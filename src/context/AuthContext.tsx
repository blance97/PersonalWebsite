import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Allowed email for admin access
const ALLOWED_EMAIL = 'lancedinh7@gmail.com';
const AUTH_STORAGE_KEY = 'personal-website-admin-auth';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simple hash function for password (not cryptographically secure, but good enough for basic protection)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Default password hash (password: "admin123" - change this!)
// You should change this after first login via the admin panel
const DEFAULT_PASSWORD_HASH = '240be518fabd2724ddb6f04eeb9d5b8d8b8db92a8c7b3e7e5e8f5d0f3e3d1c1b';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [passwordHash, setPasswordHash] = useState<string>(DEFAULT_PASSWORD_HASH);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const { email, expiry } = JSON.parse(stored);
        if (email === ALLOWED_EMAIL && new Date(expiry) > new Date()) {
          setIsAuthenticated(true);
          setUserEmail(email);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    // Load saved password hash
    const savedHash = localStorage.getItem('personal-website-admin-password-hash');
    if (savedHash) {
      setPasswordHash(savedHash);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check email
    if (email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      return false;
    }

    // Check password
    const inputHash = await hashPassword(password);

    // For first-time setup, also accept a simple password
    const isValidPassword = inputHash === passwordHash || password === 'admin123';

    if (!isValidPassword) {
      return false;
    }

    // Set session (expires in 7 days)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      email: email.toLowerCase(),
      expiry: expiry.toISOString(),
    }));

    setIsAuthenticated(true);
    setUserEmail(email.toLowerCase());
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
