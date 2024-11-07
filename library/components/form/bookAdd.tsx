'use client';
import React, { useState, useEffect } from 'react';
import MultiSelector from '../ui/mult-select';
import { addBook, getAuthors, getGenres, getPublisher } from '@/app/action/action';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Option = {
  label: string;
  value: string;
  description?: string;
};

const MultipleSelectorControlled = () => {
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);
    const [publisher , setPublisher] = useState([]);
    // const [selectedPublisher, setSelectedPublisher] = useState([]);

    const fetchDataGenereAuthors = async () => {
        const auhtors = await getAuthors();
        const generes = await getGenres();
        const publisher = await getPublisher();
        setAuthorOptions(
          auhtors.map((author: { id: number; name: string; bio: string }) => ({
            label: author.name,
            value: author.id.toString(),
            description: author.bio,
          }))
        );
        setGenreOptions(
          generes.map((genre: { id: number; name: string }) => ({
            label: genre.name,
            value: genre.id.toString(),
          }))
        );
        setPublisher(
          publisher.map((publisher: { id: number; name: string }) => ({
            name: publisher.name,
              id: publisher.id.toString(),

          }))
        );
    }
    useEffect(() => {
        fetchDataGenereAuthors();
    }
    , []);
    return (
//  onSubmit={
//               (e) => {
//                   e.preventDefault();
//   const formData = new FormData(e.target as HTMLFormElement);
//             const data = Object.fromEntries(formData.entries());
//             console.log(JSON.stringify(data));
//               }
//           }
    <div className="flex w-full flex-col gap-5 px-10">
          <form    action={addBook}  >

              <Input type='text' placeholder='title' name='title' />
              <Input type='text' placeholder='isbn' name='isbn' />
              <Input type='number' placeholder='publication year' name='publication_year' />
              <Input type='text' placeholder='language' name='language' />
              <Textarea placeholder='summary' name='summary' />
            <Select name='publisher'>
        <SelectTrigger className="w-[180px]" >
      <SelectValue placeholder="publishers" />
    </SelectTrigger>
    <SelectContent>
        {publisher.map((publisher: any) => (
            <SelectItem key={publisher.id} value={publisher.id}>
            {publisher.name}
            </SelectItem>
        ))}
    </SelectContent>
</Select>
             <div>
        <p className="text-primary">Selected Authors: {selectedAuthors.map((author) => author.label).join(', ')}</p>
                  <MultiSelector
                name='author'
          options={authorOptions}
          selectedOptions={selectedAuthors}
          onChange={setSelectedAuthors}
          placeholder="Select authors..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>
      <div>
        <p className="text-primary">Selected Genres: {selectedGenres.map((genre) => genre.label).join(', ')}</p>
                  <MultiSelector
                name='genre'
          options={genreOptions}
          selectedOptions={selectedGenres}
          onChange={setSelectedGenres}
          placeholder="Select genres..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
              </div>
                <button type='submit' className='bg-primary text-white p-2 rounded-md'>Submit</button>
          </form>
    </div>
  );
};

export default MultipleSelectorControlled;
