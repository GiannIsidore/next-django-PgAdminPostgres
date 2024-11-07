'use client';
import React, { useState, useEffect } from 'react';
import MultiSelector from '../ui/mult-select';

type Option = {
  label: string;
  value: string;
  description?: string;
};

const MultipleSelectorControlled = () => {
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Option[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorResponse = await fetch('http://127.0.0.1:8000/api/authors/all/');
        const authorData = await authorResponse.json();
        setAuthorOptions(
          authorData.map((author: { id: number; name: string; bio: string }) => ({
            label: author.name,
            value: author.id.toString(),
            description: author.bio,
          }))
        );

        const genreResponse = await fetch('http://127.0.0.1:8000/api/genres/all/');
        const genreData = await genreResponse.json();
        setGenreOptions(
          genreData.map((genre: { id: number; name: string }) => ({
            label: genre.name,
            value: genre.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <div>
        <p className="text-primary">Selected Authors: {selectedAuthors.map((author) => author.label).join(', ')}</p>
        <MultiSelector
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
    </div>
  );
};

export default MultipleSelectorControlled;
