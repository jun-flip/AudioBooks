import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types/supabase';

export const authService = {
  async signUp(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return {
      user: data.user as User | null,
      error: error as Error | null,
    };
  },

  async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user as User | null,
      error: error as Error | null,
    };
  },

  async resendConfirmationEmail(email: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    return { error: error as Error | null };
  },

  async signOut(): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signOut();
    return { error: error as Error | null };
  },

  async getCurrentUser(): Promise<{ user: User | null; error: Error | null }> {
    const { data: { user }, error } = await supabase.auth.getUser();
    return {
      user: user as User | null,
      error: error as Error | null,
    };
  },
}; 