import React, { useState, useMemo } from 'react';
import { useDoctors } from './hooks/useDoctors';
import Autocomplete from './components/Autocomplete/Autocomplete';
import DoctorList from './components/DoctorList/DoctorList';
import FilterPanel from './components/Filters/FilterPanel';

export default function App() {
  const { doctors, loading } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');
  const [mode, setMode] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const [showFilters, setShowFilters] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    return doctors
      .filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);
  }, [searchTerm, doctors]);

  const specialties = useMemo(
    () =>
      Array.from(
        new Set(
          doctors.flatMap(d => d.specialities.map(s => s.name))
        )
      ),
    [doctors]
  );

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>;
  }

  return (
    <>
      <header className="sticky top-0 z-20 bg-white px-4 py-3 shadow-sm flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex-1">
          <Autocomplete
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            suggestions={suggestions}
          />
        </div>

        <button
          className="ml-4 md:hidden text-blue-600 font-medium"
          onClick={() => setShowFilters(true)}
        >
          <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6 text-gray-700"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
            >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M4 6h16M4 12h16M4 18h16"
           />
         </svg>
        </button>
      </header>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-4 px-4 md:px-6 gap-6">
        <main className="flex-1">
          <DoctorList
            doctors={doctors}
            search={selectedSearch}
            mode={mode}
            specs={selectedSpecs}
            sortBy={sortBy}
          />
        </main>

        <aside className="hidden md:block w-64">
          <FilterPanel
            mode={mode}
            onModeChange={setMode}
            specialties={specialties}
            selectedSpecs={selectedSpecs}
            onSpecsChange={setSelectedSpecs}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-30 bg-black/40">
          <div className="absolute inset-y-0 right-0 w-3/4 bg-white p-4 shadow-lg overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>
            <FilterPanel
              mode={mode}
              onModeChange={val => {
                setMode(val);
                setShowFilters(false);
              }}
              specialties={specialties}
              selectedSpecs={selectedSpecs}
              onSpecsChange={vals => {
                setSelectedSpecs(vals);
              }}
              sortBy={sortBy}
              onSortChange={val => {
                setSortBy(val);
                setShowFilters(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
