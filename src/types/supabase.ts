export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  audio_path: string | null;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  book_id: string;
  status: 'active' | 'expired';
  expires_at: string;
  created_at: string;
  updated_at: string;
} 