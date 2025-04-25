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
      <form
        onSubmit={e => {
          e.preventDefault();
          setSelectedSearch(searchTerm);
        }}
      >
        <input
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setSelectedSearch('');
          }}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="
            w-full h-12
            px-4
            bg-gray-100 rounded-lg border border-gray-300
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-400
            transition
          "
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {suggestions.map(doc => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSearchTerm(doc.name);
                setSelectedSearch(doc.name);
              }}
            >
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
              />
              <div>
                <div className="font-medium text-gray-900">{doc.name}</div>
                <div className="text-xs text-gray-500">
                  {doc.specialities[0]?.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
