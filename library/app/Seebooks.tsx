import Link from 'next/link';
import React from 'react'

interface Genre {
    id: number;
    name: string;
}
interface Book {
    id: number;
    genres: string[];
    authors: string[];
    title: string;
    isbn: string;
    publication_year: number;
    language: string;
    summary: string;
    publisher: number;
}
export default async function SeeBooks() {
    const genre = await fetch('http://127.0.0.1:8000/api/genres/all')
    const genreData = await genre.json()
    console.log(genreData)

    const book = await fetch('http://127.0.0.1:8000/api/books/all')
    const bookData = await book.json()
    console.log(bookData)
  return (
      <div>
       <h1 className='text-black'>test</h1>
          {/* {genreData.map((genre: Genre) =>
              (<h1 className='text-black' key={genre.id}> { genre.name}</h1>)
          )} */}
            {bookData.map((book: Book) =>
            (
                <Link key={book.id} href={`book/${book.id}/`}>
                 <h1 className='text-black' > {book.title}</h1>
                </Link>
            )
            )}
    </div>
  )
}
