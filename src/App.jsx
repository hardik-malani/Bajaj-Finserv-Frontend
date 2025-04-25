import React, { useState } from 'react';
import { useDoctors } from './hooks/useDoctors';

export default function App() {
  const { doctors, loading } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');

  const rawMatches = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const suggestions = searchTerm ? rawMatches.slice(0, 3) : [];

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>;
  }

  const displayedDoctors = selectedSearch
    ? doctors.filter(doc =>
        doc.name.toLowerCase().includes(selectedSearch.toLowerCase())
      )
    : doctors;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
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
            {suggestions.map(s => (
              <li
                key={s.id}
                data-testid="suggestion-item"
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(s.name);
                  setSelectedSearch(s.name);
                }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        {displayedDoctors.length > 0 ? (
          displayedDoctors.map(doc => (
            <div
              key={doc.id}
              data-testid="doctor-card"
              className="p-4 bg-white rounded shadow"
            >
              <h2 data-testid="doctor-name" className="text-xl font-semibold">
                {doc.name}
              </h2>
              <p data-testid="doctor-specialty">
                {doc.specialities.map(s => s.name).join(', ')}
              </p>
              <p data-testid="doctor-experience">{doc.experience}</p>
              <p data-testid="doctor-fee">{doc.fees}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
}
