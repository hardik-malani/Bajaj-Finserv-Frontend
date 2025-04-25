import React, { useMemo } from 'react'
import DoctorCard from '../DoctorList/DoctorCard'

export default function DoctorList({
  doctors,
  search,
  mode,
  specs,
  sortBy
}) {
  const displayed = useMemo(() => {
    let list = [...doctors]

    if (search) {
      const term = search.toLowerCase()
      list = list.filter(d => d.name.toLowerCase().includes(term))
    }

    if (mode === 'video')    list = list.filter(d => d.video_consult)
    if (mode === 'clinic')   list = list.filter(d => d.in_clinic)

    if (specs.length > 0) {
      list = list.filter(d =>
        d.specialities.some(s => specs.includes(s.name))
      )
    }

    if (sortBy === 'fees') {
      list.sort((a, b) => {
        const fa = parseInt(a.fees.replace(/[^\d]/g, ''), 10)
        const fb = parseInt(b.fees.replace(/[^\d]/g, ''), 10)
        return fa - fb
      })
    }
    if (sortBy === 'experience') {
      list.sort((a, b) => {
        const ea = parseInt(a.experience, 10)
        const eb = parseInt(b.experience, 10)
        return eb - ea
      })
    }

    return list
  }, [doctors, search, mode, specs, sortBy])

  if (displayed.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No doctors found.</p>;
  }
  
  return (
    <div className="space-y-4">
      {displayed.map(doc => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  );
}
