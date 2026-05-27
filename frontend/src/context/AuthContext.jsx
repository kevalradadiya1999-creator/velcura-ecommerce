import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { config } from '../utils/config';

const AuthContext = createContext(null);
const USER_KEY = 'velcura_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authCallback, setAuthCallback] = useState(null);

  const openAuthModal = useCallback((callback = null) => {
    setAuthCallback(() => callback);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthCallback(null);
  }, []);

  const login = useCallback(async (email, phone) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name}!`);
      
      setIsAuthModalOpen(false);
      if (authCallback) {
        authCallback(data.user);
        setAuthCallback(null);
      }
      return { success: true, user: data.user };
    } catch (err) {
      toast.error(err.message || 'Failed to login');
      return { success: false, error: err.message };
    }
  }, [authCallback]);

  const register = useCallback(async (name, email, phone) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      toast.success(`Account created! Welcome, ${data.user.name}!`);
      
      setIsAuthModalOpen(false);
      if (authCallback) {
        authCallback(data.user);
        setAuthCallback(null);
      }
      return { success: true, user: data.user };
    } catch (err) {
      toast.error(err.message || 'Failed to register');
      return { success: false, error: err.message };
    }
  }, [authCallback]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    toast.success('Logged out successfully.');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
