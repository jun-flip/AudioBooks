'use client'

import React from 'react'
import Image from 'next/image'

const books = [
  {
    id: 1,
    title: 'Война и мир',
    author: 'Лев Толстой',
    description: 'Эпический роман о войне 1812 года и жизни русского общества.',
    image: '/images/books/war-and-peace.jpg',
    duration: '61 час',
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    description: 'Мистический роман о добре и зле, любви и предательстве.',
    image: '/images/books/master-and-margarita.jpg',
    duration: '15 часов',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    description: 'Психологический роман о преступлении и его последствиях.',
    image: '/images/books/crime-and-punishment.jpg',
    duration: '21 час',
    rating: 4.7,
  },
]

const Books: React.FC = () => {
  return (
    <section id="books" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Популярные аудиокниги
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Выбирайте из нашей коллекции лучших аудиокниг
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{book.author}</p>
                <p className="mt-4 text-gray-600">{book.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">
                      {book.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{book.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Books 