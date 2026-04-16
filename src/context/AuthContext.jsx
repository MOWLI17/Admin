import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const [timeLeft, setTimeLeft] = useState(INACTIVITY_LIMIT / 1000);

  // Inactivity Logic
  useEffect(() => {
    let timeout;
    let interval;

    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
      
      if (user) {
        setTimeLeft(INACTIVITY_LIMIT / 1000);
        
        timeout = setTimeout(() => {
          logout();
        }, INACTIVITY_LIMIT);

        interval = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    if (user) {
      resetTimer();
      events.forEach(event => document.addEventListener(event, resetTimer));
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [user]);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = { id: 1, name: 'Admin User', email, role: 'Master Node' };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const register = (name, email, password) => {
    // Mock register logic
    const mockUser = { id: Date.now(), name, email, role: 'On-Site Staff' };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, timeLeft }}>
      {children}
    </AuthContext.Provider>
  );
};
