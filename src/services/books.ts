import { supabase } from '@/lib/supabaseClient';
import { storageService } from './storage';
import { Book } from '@/types/supabase';

export const booksService = {
  // Получение всех книг
  async getAllBooks(): Promise<{ books: Book[] | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      books: data as Book[] | null,
      error: error as Error | null,
    };
  },

  // Получение книги по ID
  async getBookById(id: string): Promise<{ book: Book | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    return {
      book: data as Book | null,
      error: error as Error | null,
    };
  },

  // Создание новой книги
  async createBook(book: Omit<Book, 'id' | 'created_at' | 'audio_path'>, audioFile: File): Promise<{ book: Book | null; error: Error | null }> {
    // Сначала создаем запись о книге
    const { data: bookData, error: bookError } = await supabase
      .from('books')
      .insert([book])
      .select()
      .single();

    if (bookError) {
      console.error('Error creating book:', bookError);
      return { book: null, error: bookError as Error };
    }

    // Затем загружаем аудиофайл
    const { path, error: uploadError } = await storageService.uploadAudiobook(audioFile, bookData.id);

    if (uploadError) {
      console.error('Error uploading audiobook:', uploadError);
      // Удаляем созданную книгу, если загрузка файла не удалась
      await supabase.from('books').delete().eq('id', bookData.id);
      return { book: null, error: uploadError };
    }

    // Обновляем запись книги с путем к аудиофайлу
    const { data: updatedBook, error: updateError } = await supabase
      .from('books')
      .update({ audio_path: path })
      .eq('id', bookData.id)
      .select()
      .single();

    return {
      book: updatedBook as Book | null,
      error: updateError as Error | null,
    };
  },

  // Обновление книги
  async updateBook(id: string, updates: Partial<Book>, audioFile?: File): Promise<{ book: Book | null; error: Error | null }> {
    // Если есть новый аудиофайл, сначала загружаем его
    if (audioFile) {
      const { path, error: uploadError } = await storageService.uploadAudiobook(audioFile, id);
      if (uploadError) {
        return { book: null, error: uploadError };
      }
      updates.audio_path = path;
    }

    const { data, error } = await supabase
      .from('books')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return {
      book: data as Book | null,
      error: error as Error | null,
    };
  },

  // Удаление книги
  async deleteBook(id: string): Promise<{ error: Error | null }> {
    // Сначала получаем информацию о книге, чтобы удалить аудиофайл
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('audio_path')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { error: fetchError as Error };
    }

    // Удаляем аудиофайл, если он есть
    if (book?.audio_path) {
      const { error: deleteFileError } = await storageService.deleteAudiobook(book.audio_path);
      if (deleteFileError) {
        return { error: deleteFileError };
      }
    }

    // Удаляем запись о книге
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    return { error: error as Error | null };
  },

  // Поиск книг
  async searchBooks(query: string): Promise<{ books: Book[] | null; error: Error | null }> {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    return {
      books: data as Book[] | null,
      error: error as Error | null,
    };
  },

  // Получение URL для прослушивания аудиокниги
  async getAudiobookUrl(bookId: string): Promise<{ url: string | null; error: Error | null }> {
    const { book, error: fetchError } = await this.getBookById(bookId);
    if (fetchError || !book?.audio_path) {
      return { url: null, error: fetchError || new Error('Audio file not found') };
    }

    return storageService.getAudiobookUrl(book.audio_path);
  }
}; 