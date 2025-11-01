
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // In a real app, you'd check a token in localStorage, etc.
  // For this mock, we'll just base it on the user state.
  const isAuthenticated = !!user;

  const login = (userData: User) => {
    setUser(userData);
    // In a real app, you'd probably store a token here
  };

  const logout = () => {
    setUser(null);
    // In a real app, you'd clear the token here
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(prevUser => (prevUser ? { ...prevUser, ...updatedData } : null));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};