import { supabase } from '@/lib/supabaseClient';

export const adminService = {
  async isAdmin(): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('is_admin');

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return data;
  },

  async getAdminUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin');

    if (error) {
      console.error('Error fetching admin users:', error);
      return { users: null, error };
    }

    return { users: data, error: null };
  },

  async updateUserRole(userId: string, role: 'admin' | 'user') {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user role:', error);
      return { user: null, error };
    }

    return { user: data, error: null };
  }
}; 