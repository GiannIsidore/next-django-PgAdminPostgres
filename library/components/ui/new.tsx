'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string
  description?: string
}

type MultiSelectorProps = {
  options?: Option[]
  selectedOptions?: Option[]
  onChange: (options: Option[]) => void
  placeholder?: string
  emptyIndicator?: React.ReactNode
}

export default function MultiSelector({
  options = [],
  selectedOptions = [],
  onChange,
  placeholder = 'Select options...',
  emptyIndicator = 'No options available',
}: MultiSelectorProps) {
  const [open, setOpen] = useState(false)
  const commandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = (option: Option) => {
    if (selectedOptions.some((selected) => selected.value === option.value)) {
      onChange(selectedOptions.filter((selected) => selected.value !== option.value))
    } else {
      onChange([...selectedOptions, option])
    }
  }

  const handleRemove = (option: Option) => {
    onChange(selectedOptions.filter((selected) => selected.value !== option.value))
  }

  if (!Array.isArray(options)) {
    console.error('MultiSelector: options prop must be an array')
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <Badge key={option.value} variant="secondary" className="mr-1">
                  {option.label}
                      <button
                          title='Remove'
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRemove(option)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleRemove(option)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command ref={commandRef}>
          <CommandInput placeholder="Search options..." />
          <CommandEmpty>{emptyIndicator}</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option)}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <span>{option.label}</span>
                  {option.description && (
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  )}
                </div>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedOptions.some((selected) => selected.value === option.value)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
