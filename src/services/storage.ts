import { supabase } from '@/lib/supabaseClient';

export const storageService = {
  // Загрузка аудиокниги
  async uploadAudiobook(file: File, bookId: string): Promise<{ path: string | null; error: Error | null }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('audiobooks')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading audiobook:', error);
      return { path: null, error };
    }

    return { path: filePath, error: null };
  },

  // Получение URL для прослушивания аудиокниги
  async getAudiobookUrl(path: string): Promise<{ url: string | null; error: Error | null }> {
    const { data, error } = await supabase.storage
      .from('audiobooks')
      .createSignedUrl(path, 3600); // URL действителен 1 час

    if (error) {
      console.error('Error getting audiobook URL:', error);
      return { url: null, error };
    }

    return { url: data.signedUrl, error: null };
  },

  // Удаление аудиокниги
  async deleteAudiobook(path: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.storage
      .from('audiobooks')
      .remove([path]);

    if (error) {
      console.error('Error deleting audiobook:', error);
    }

    return { error };
  },

  // Получение размера файла
  async getFileSize(path: string): Promise<{ size: number | null; error: Error | null }> {
    try {
      const { data } = await supabase.storage
        .from('audiobooks')
        .getPublicUrl(path);

      const response = await fetch(data.publicUrl, { method: 'HEAD' });
      const size = parseInt(response.headers.get('content-length') || '0', 10);
      return { size, error: null };
    } catch (err) {
      console.error('Error fetching file size:', err);
      return { size: null, error: err as Error };
    }
  }
}; 