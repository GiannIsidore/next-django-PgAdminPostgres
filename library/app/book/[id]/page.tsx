'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
const BookPage = () => {
;
    const { id } = useParams();  // Get `id` from the URL
    const [book, setBook] = useState<Book | null>(null);


    useEffect(() => {
        if (id) {
            console.log(id);
            fetchBook();
        }

    }, [id]);
    const fetchBook = async () => {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`);
        const data = await response.json();
        setBook(data);
    }
    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Book ID: {id}</h1>
            {book ? (
                <div>
                    <h2>{book.title}</h2>
                    <p>{book.summary}</p>
                    <p>Authors: {book.authors.join(', ')}</p>
                    <p>Genres: {book.genres.join(', ')}</p>
                </div>
            ) : (
                <div>Loading...</div>)}
        </div>
    );
};

export default BookPage;
