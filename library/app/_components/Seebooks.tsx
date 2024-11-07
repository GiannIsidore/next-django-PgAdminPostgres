import Link from 'next/link';
import React from 'react'
import { addAuthor, addPublisher } from '@/app/action/action';
import AddAuthor from '@/components/form/authorAdd';
import AddPublisher from '@/components/form/publisherAdd';
import AddBook from '@/components/form/bookAdd';
import MultipleSelectorControlled from '@/components/form/bookAdd';

interface Genre {
    id: number;
    name: string;
}
interface Book {
    id: number;
    genres: Genre[];
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
    // console.log(genreData)

    const book = await fetch('http://127.0.0.1:8000/api/books/all')
    const bookData = await book.json()
    // console.log(bookData)

    const author = await fetch('http://127.0.0.1:8000/api/authors/all')
    const authorData = await author.json()

    const publisher = await fetch('http://127.0.0.1:8000/api/publishers/all')
    const publisherData = await publisher.json()
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

            {/* {authorData.map((author: any) =>
                (
                <div key={author.id} className='p-2 bg-black text-white rounded-md mb-3'>
                  <h1 key={author.id}> {author.name}</h1>
                  <p>{author.bio}</p>
                </div>
                )
          )} */}
          {/* <AddAuthor/> */}

          {/* {publisherData.map((publisher: any) =>
          (
              <div key={publisher.id} className='p-2 bg-black text-white rounded-md mb-3'>
                  <h1 key={publisher.id}> {publisher.name}</h1>
                  <p>{publisher.address}</p>
                  <p>{publisher.phone}</p>
                  <p>{publisher.email}</p>
              </div>
          ))} */}
          {/* <AddPublisher/> */}
          <MultipleSelectorControlled/>

    </div>
  )
}
