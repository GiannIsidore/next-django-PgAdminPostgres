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
  genres: number[];
  authors: number[];
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
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
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

      // Fetch authors and genres based on the returned IDs
      await fetchAuthors(data.authors);
      await fetchGenres(data.genres);

    } catch (err) {
      setError('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async (authorIds: number[]) => {
    try {
      const authorPromises = authorIds.map(id =>
        fetch(`http://127.0.0.1:8000/api/authors/${id}/`).then(res => res.json())
      );
      const authorData = await Promise.all(authorPromises);
      setAuthors(authorData);
    } catch (err) {
      console.error("Error fetching authors:", err);
    }
  };

  const fetchGenres = async (genreIds: number[]) => {
    try {
      const genrePromises = genreIds.map(id =>
        fetch(`http://127.0.0.1:8000/api/genres/${id}/`).then(res => res.json())
      );
      const genreData = await Promise.all(genrePromises);
      setGenres(genreData);
    } catch (err) {
      console.error("Error fetching genres:", err);
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
            <p>Authors: {authors.map(author => author.name).join(', ')}</p>
            <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </div>
  );
};

export default BookPage;
