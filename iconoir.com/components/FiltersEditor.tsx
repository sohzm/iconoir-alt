import type { IconListFilters } from './IconList';
import React from 'react';
import { LargeInput } from './Input';

export interface FiltersEditorProps {
  filters: IconListFilters;
  onChange: (filters: IconListFilters) => void;
}

export function FiltersEditor({ filters, onChange }: FiltersEditorProps) {
  const [, startTransition] = (React as any).useTransition();
  const [search, setSearch] = React.useState(filters.search);

  // Keep track if the user hits tab before scrolling, so we can scroll the search
  // field to the top of the page automatically.
  const didScrollRef = React.useRef(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  React.useEffect(() => {
    const scrollEvent = () => {
      didScrollRef.current = true;
      window.removeEventListener('scroll', scrollEvent);
    };

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  React.useEffect(() => {
    setSearch(filters.search);
  }, [filters]);

  function updateFilters(partial: Partial<IconListFilters>) {
    startTransition(() => {
      onChange({
        ...filters,
        ...partial,
      });
    });
  }

  return (
    <LargeInput
      ref={inputRef}
      placeholder="Search..."
      value={search}
      type="search"
      autoCapitalize="none"
      tabIndex={1}
      onFocus={(e) => {
        if (!didScrollRef.current) {
          e.target.scrollIntoView({
            block: 'start',
            behavior: 'auto',
          });
        }
      }}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        updateFilters({ search: value });
      }}
    />
  );
}
