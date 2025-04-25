import React from 'react';

export default function Autocomplete({
  searchTerm,
  setSearchTerm,
  selectedSearch,
  setSelectedSearch,
  suggestions
}) {
  return (
    <div className="relative">
      <input
        data-testid="autocomplete-input"
        type="text"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setSelectedSearch('');
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setSelectedSearch(searchTerm);
          }
        }}
        placeholder="Search doctors..."
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white w-full mt-1 border rounded">
          {suggestions.map(doc => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm(doc.name);
                setSelectedSearch(doc.name);
              }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
