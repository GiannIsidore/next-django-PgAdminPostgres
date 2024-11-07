'use client';
import React, { useState, useEffect } from 'react';

type Option = {
  label: string;
  value: string;
  description?: string;
};

type MultiSelectorProps = {
  options: Option[];
  selectedOptions: Option[];
  onChange: (options: Option[]) => void;
  placeholder?: string;
  emptyIndicator?: React.ReactNode;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({ options, selectedOptions, onChange, placeholder, emptyIndicator }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: Option) => {
    if (selectedOptions.some((selected) => selected.value === option.value)) {
      onChange(selectedOptions.filter((selected) => selected.value !== option.value));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 rounded p-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((opt) => opt.label).join(', ')
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border border-gray-300 bg-white rounded shadow-lg">
          {options.length === 0 ? (
            <div className="p-2 text-center">{emptyIndicator}</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option)}
                className={`p-2 cursor-pointer hover:bg-blue-100 ${
                  selectedOptions.some((selected) => selected.value === option.value) ? 'bg-blue-200' : ''
                }`}
              >
                <span className="font-medium">{option.label}</span>
                {option.description && <p className="text-sm text-gray-500">{option.description}</p>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default MultiSelector;
