'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/supabase';
import { authService } from '@/services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { user, error } = await authService.getCurrentUser();
      if (error) throw error;
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      const { user, error } = await authService.signIn(email, password);
      if (!error) setUser(user);
      return { error };
    },
    signUp: async (email: string, password: string) => {
      const { user, error } = await authService.signUp(email, password);
      if (!error) setUser(user);
      return { error };
    },
    signOut: async () => {
      const { error } = await authService.signOut();
      if (!error) setUser(null);
      return { error };
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 