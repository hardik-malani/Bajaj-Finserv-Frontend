import React, { useState, useMemo } from 'react'
import { useDoctors } from './hooks/useDoctors'
import Autocomplete from './components/Autocomplete/Autocomplete'
import FilterPanel from './components/Filters/FilterPanel'
import DoctorList from './components/DoctorList/DoctorList'

export default function App() {
  const { doctors, loading } = useDoctors()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSearch, setSelectedSearch] = useState('')
  const [mode, setMode] = useState('')
  const [selectedSpecs, setSelectedSpecs] = useState([])
  const [sortBy, setSortBy] = useState('')

  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return doctors
      .filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3)
  }, [searchTerm, doctors])

  const specialties = useMemo(
    () => Array.from(
      new Set(doctors.flatMap(d => d.specialities.map(s => s.name)))
    ),
    [doctors]
  )

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>
  }

  return (
    <div className="flex max-w-6xl mx-auto p-4 space-x-6">
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
  )
}
