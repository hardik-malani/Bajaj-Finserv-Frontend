// src/App.jsx
import React, { useState, useMemo } from 'react'
import {
  BrowserRouter,
  useSearchParams,
} from 'react-router-dom'
import { useDoctors } from './hooks/useDoctors'
import Autocomplete from './components/Autocomplete/Autocomplete'
import FilterPanel from './components/Filters/FilterPanel'
import DoctorList from './components/DoctorList/DoctorList'

function AppContent() {
  const { doctors, loading } = useDoctors()
  const [searchParams, setSearchParams] = useSearchParams()

  // URL-driven state:
  const search   = searchParams.get('search') || ''
  const mode     = searchParams.get('mode')   || ''
  const sortBy   = searchParams.get('sort')   || ''
  const specs    = searchParams.get('specs')
    ? searchParams.get('specs').split(',')
    : []

  // local only for the input box
  const [searchTerm, setSearchTerm] = useState(search)

  const [mobileOpen, setMobileOpen] = useState(false)

  function updateParam(key, value) {
    const p = new URLSearchParams(searchParams)
    if (value == null || value === '' || (Array.isArray(value) && !value.length)) {
      p.delete(key)
    } else {
      p.set(key, Array.isArray(value) ? value.join(',') : value)
    }
    setSearchParams(p, { replace: false })
  }

  function onSearchSubmit() {
    updateParam('search', searchTerm)
  }

  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return doctors
      .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 3)
  }, [searchTerm, doctors])

  const specialties = useMemo(() => {
    return Array.from(
      new Set(doctors.flatMap(d => d.specialities.map(s => s.name)))
    )
  }, [doctors])

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* mobile header: input + hamburger */}
      <div className="flex items-center lg:hidden space-x-2">
        <div className="flex-1">
          <form onSubmit={e => { e.preventDefault(); onSearchSubmit() }}>
            <input
              data-testid="autocomplete-input"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search Symptoms, Doctors, Specialists, Clinics"
              className="w-full h-12 px-4 bg-gray-100 rounded-lg border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </form>
        </div>
        <button onClick={() => setMobileOpen(true)} aria-label="Open filters" className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <aside className="fixed inset-y-0 right-0 w-3/4 bg-white z-50 p-4 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterPanel
            mode={mode}
            onModeChange={m => updateParam('mode', m)}
            specialties={specialties}
            selectedSpecs={specs}
            onSpecsChange={s => updateParam('specs', s)}
            sortBy={sortBy}
            onSortChange={s => updateParam('sort', s)}
          />
        </aside>
      )}

      <div className="flex-1 space-y-6">
        <div className="hidden lg:block">
          <Autocomplete
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSearch={search}
            setSelectedSearch={val => updateParam('search', val)}
            suggestions={suggestions}
          />
        </div>
        <DoctorList
          doctors={doctors}
          search={search}
          mode={mode}
          specs={specs}
          sortBy={sortBy}
        />
      </div>

      <div className="hidden lg:block">
        <FilterPanel
          mode={mode}
          onModeChange={m => updateParam('mode', m)}
          specialties={specialties}
          selectedSpecs={specs}
          onSpecsChange={s => updateParam('specs', s)}
          sortBy={sortBy}
          onSortChange={s => updateParam('sort', s)}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
