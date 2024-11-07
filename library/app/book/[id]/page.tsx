'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Author {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Book {
  id: number;
  genres: Genre[];
  authors: Author[];
  title: string;
  isbn: string;
  publication_year: number;
  language: string;
  summary: string;
  publisher: number;
}

const BookPage = () => {
  const { id } = useParams();  // Get `id` from the URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError('Failed to load book details');
    //   console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Book ID: {id}</h1>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>{book.summary}</p>
            <div className='bg-white text-black w-[50%] rounded-sm p-3'>
                <p>Authors: {book.authors.map(author => author.name).join(', ')}</p>
                <p>Genres: {book.genres.map(genre => genre.name).join(', ')}</p>
            </div>
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </div>
  );
};

export default BookPage;
