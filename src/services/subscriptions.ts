import { supabase } from '@/lib/supabaseClient';
import { Subscription } from '@/types/supabase';

export const subscriptionsService = {
  async getUserSubscriptions(userId: string): Promise<{ subscriptions: Subscription[] | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return {
      subscriptions: data as Subscription[] | null,
      error: error as Error | null,
    };
  },

  async createSubscription(userId: string, bookId: string): Promise<{ subscription: Subscription | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: userId,
          book_id: bookId,
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        },
      ])
      .select()
      .single();

    return {
      subscription: data as Subscription | null,
      error: error as Error | null,
    };
  },

  async checkSubscription(userId: string, bookId: string): Promise<{ hasAccess: boolean; error: Error | null }> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .eq('status', 'active')
      .gt('expires_at', new Date().toISOString())
      .single();

    return {
      hasAccess: !!data,
      error: error as Error | null,
    };
  },
}; 