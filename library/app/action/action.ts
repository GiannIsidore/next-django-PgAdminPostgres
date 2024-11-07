'use server'

import { revalidatePath } from "next/cache";

export async function addAuthor(formData: FormData) {
  const name = formData.get('name');
  const bio = formData.get('bio');

  const response = await fetch(`http://127.0.0.1:8000/api/authors/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, bio }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  revalidatePath('/app/_components/Seebooks.tsx')
  const author = await response.json();
  return author;

}

export async function addPublisher(formData: FormData) {
    const name = formData.get('name');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const email = formData.get('email');

   const response = await fetch(`http://127.0.0.1:8000/api/publishers/`, { method: 'POST',headers: {

    },
        body: JSON.stringify({
            name,
            address,
            phone,
            email
        })
   },)
    if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
    revalidatePath('/app/_components/Seebooks.tsx')
    const publisher = await response.json();
    return publisher;
}

export async function getBooks() {
    const response = await fetch(`http://127.0.0.1:8000/api/books/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const books = await response.json();
    return books;
}
export async function getAuthors() {
    const response = await fetch(`http://127.0.0.1:8000/api/authors/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const authors = await response.json();
    return authors;
}

export async function getGenres() {
    const response = await fetch(`http://127.0.0.1:8000/api/genres/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }


    const genres = await response.json();
    return genres;
}

export async function getBookById(id: number) {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const book = await response.json();
    return book;
}

export async function getAuthorById(id: number) {
  const response = await fetch(`http://127.0.0.1:8000/api/auhtors/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }
    const author = await response.json();
    return author;

}
export async function getGenreById(id: number) {
      const response = await fetch(`http://127.0.0.1:8000/api/genres/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }
    const genre = await response.json();
    return genre;
}
export async function getPublisher() {
    const response = await fetch(`http://127.0.0.1:8000/api/publishers/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
}

const publishers = await response.json();
return publishers;
}

export async function addBook(formData: FormData) {
    const title = formData.get('title');
    const isbn = formData.get('isbn');
    const publication_year = formData.get('publication_year');
    const language = formData.get('language');
    const summary = formData.get('summary');
    const publisher = formData.get('publisher');

    //! Convert comma-separated values to arrays of objects
    const genres = (formData.get('genre') as string)?.split(',').map((id) => ( parseInt(id.trim()) ));
    const authors = (formData.get('author') as string)?.split(',').map((id) => (parseInt(id.trim()) ));


    // console.log("Title:", title);
    // console.log("ISBN:", isbn);
    // console.log("Publication Year:", publication_year);
    // console.log("Language:", language);
    // console.log("Summary:", summary);
    // console.log("Publisher:", publisher);
    // console.log("Genres:", genres);
    // console.log("Authors:", authors);

    const response = await fetch(`http://127.0.0.1:8000/api/books/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            isbn,
            publication_year,
            language,
            summary,
            publisher,
            genres,
            authors
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    revalidatePath('/app/_components/Seebooks.tsx');
    const book = await response.json();
    return book;
}
