import React, { useState, useEffect, useMemo } from 'react'
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
  
  
  const specialties = useMemo(
    () => Array.from(new Set(doctors.flatMap(d => d.specialities.map(s => s.name)))),
    [doctors]
  )

  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return doctors
      .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 3)
  }, [searchTerm, doctors])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('search')) {
      const s = params.get('search')
      setSearchTerm(s)
      setSelectedSearch(s)
    }
    if (params.has('mode')) {
      setMode(params.get('mode'))
    }
    if (params.has('specialties')) {
      setSelectedSpecs(params.get('specialties').split(','))
    }
    if (params.has('sortBy')) {
      setSortBy(params.get('sortBy'))
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedSearch) params.set('search', selectedSearch)
    if (mode) params.set('mode', mode)
    if (selectedSpecs.length) params.set('specialties', selectedSpecs.join(','))
    if (sortBy) params.set('sortBy', sortBy)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)
  }, [selectedSearch, mode, selectedSpecs, sortBy])

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search)
      const s = params.get('search') || ''
      setSearchTerm(s)
      setSelectedSearch(s)
      setMode(params.get('mode') || '')
      setSelectedSpecs(params.has('specialties')
        ? params.get('specialties').split(',')
        : []
      )
      setSortBy(params.get('sortBy') || '')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-x-6 lg:space-y-0">
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
