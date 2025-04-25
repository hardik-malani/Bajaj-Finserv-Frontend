import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';

import { useDoctors } from './hooks/useDoctors';
import Autocomplete from './components/Autocomplete/Autocomplete';
import FilterPanel from './components/Filters/FilterPanel';
import DoctorList from './components/DoctorList/DoctorList';

function AppContent() {
  const { doctors, loading } = useDoctors();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. Read initial state from URL ---
  const initialSearch = searchParams.get('search') || '';
  const initialMode = searchParams.get('mode') || '';
  const initialSort = searchParams.get('sort') || '';
  const initialSpecs = searchParams.get('specs')
    ? searchParams.get('specs').split(',')
    : [];

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSearch, setSelectedSearch] = useState(initialSearch);
  const [mode, setMode] = useState(initialMode);
  const [sortBy, setSortBy] = useState(initialSort);
  const [selectedSpecs, setSelectedSpecs] = useState(initialSpecs);

  // --- 2. Update URL when state changes ---
  useEffect(() => {
    const params = {};
    if (selectedSearch) params.search = selectedSearch;
    if (mode)           params.mode   = mode;
    if (sortBy)         params.sort   = sortBy;
    if (selectedSpecs.length)
      params.specs = selectedSpecs.join(',');

    setSearchParams(createSearchParams(params), { replace: false });
  }, [selectedSearch, mode, sortBy, selectedSpecs, setSearchParams]);

  // --- 3. Suggestions & specialties lists ---
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
        new Set(doctors.flatMap(d => d.specialities.map(s => s.name)))
      ),
    [doctors]
  );

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1 space-y-6">
        <Autocomplete
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSearch={selectedSearch}
          setSelectedSearch={setSelectedSearch}
          suggestions={suggestions}
        />

        <DoctorList
          doctors={doctors}
          search={selectedSearch}
          mode={mode}
          specs={selectedSpecs}
          sortBy={sortBy}
        />
      </div>

      <FilterPanel
        mode={mode}
        onModeChange={setMode}
        specialties={specialties}
        selectedSpecs={selectedSpecs}
        onSpecsChange={setSelectedSpecs}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
