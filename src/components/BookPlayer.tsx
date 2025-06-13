'use client'

import React, { useState, useEffect } from 'react';
import { booksService } from '@/services/books';
import { Book } from '@/types/supabase';
import AudioPlayer from './AudioPlayer';

interface BookPlayerProps {
  bookId: string;
}

export default function BookPlayer({ bookId }: BookPlayerProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Загружаем информацию о книге
        const { book, error: bookError } = await booksService.getBookById(bookId);
        if (bookError) throw bookError;
        if (!book) throw new Error('Book not found');

        setBook(book);

        // Получаем URL для прослушивания
        const { url, error: urlError } = await booksService.getAudiobookUrl(bookId);
        if (urlError) throw urlError;
        if (!url) throw new Error('Audio URL not found');

        setAudioUrl(url);
      } catch (err) {
        console.error('Error loading book:', err);
        setError(err instanceof Error ? err.message : 'Failed to load book');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [bookId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (!book || !audioUrl) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Book or audio not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={book.cover_url}
              alt={book.title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {book.author}
            </div>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">{book.title}</h2>
            <p className="mt-3 text-gray-600">{book.description}</p>
          </div>
        </div>
        <div className="px-8 pb-8">
          <AudioPlayer
            url={audioUrl}
            title={book.title}
            onError={(err) => setError(err.message)}
          />
        </div>
      </div>
    </div>
  );
} 