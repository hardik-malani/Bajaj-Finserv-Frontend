import React, { useState, useMemo, useEffect } from 'react'
import { BrowserRouter, useSearchParams, createSearchParams } from 'react-router-dom'
import { useDoctors } from './hooks/useDoctors'
import Autocomplete from './components/Autocomplete/Autocomplete'
import FilterPanel from './components/Filters/FilterPanel'
import DoctorList from './components/DoctorList/DoctorList'

function AppContent() {
  const { doctors, loading } = useDoctors()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialSearch = searchParams.get('search') || ''
  const initialMode = searchParams.get('mode') || ''
  const initialSort = searchParams.get('sort') || ''
  const initialSpecs = searchParams.get('specs')
    ? searchParams.get('specs').split(',')
    : []

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedSearch, setSelectedSearch] = useState(initialSearch)
  const [mode, setMode] = useState(initialMode)
  const [sortBy, setSortBy] = useState(initialSort)
  const [selectedSpecs, setSelectedSpecs] = useState(initialSpecs)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const params = {}
    if (selectedSearch) params.search = selectedSearch
    if (mode) params.mode = mode
    if (sortBy) params.sort = sortBy
    if (selectedSpecs.length) params.specs = selectedSpecs.join(',')
    setSearchParams(createSearchParams(params), { replace: false })
  }, [selectedSearch, mode, sortBy, selectedSpecs, setSearchParams])

  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return doctors
      .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 3)
  }, [searchTerm, doctors])

  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.flatMap(d => d.specialities.map(s => s.name))))
  }, [doctors])

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex items-center lg:hidden space-x-2">
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
          onClick={() => setMobileFiltersOpen(true)}
          aria-label="Open filters"
          className="p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileFiltersOpen && (
        <aside className="fixed inset-y-0 right-0 w-3/4 bg-white z-50 p-4 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
              className="p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
        </aside>
      )}

      <div className="flex-1 space-y-6">
        <div className="hidden lg:block">
          <Autocomplete
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            suggestions={suggestions}
          />
        </div>

        <DoctorList
          doctors={doctors}
          search={selectedSearch}
          mode={mode}
          specs={selectedSpecs}
          sortBy={sortBy}
        />
      </div>

      <div className="hidden lg:block">
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
