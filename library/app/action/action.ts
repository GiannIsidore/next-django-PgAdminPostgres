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
