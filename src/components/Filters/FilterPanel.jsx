import React from 'react';
import ConsultationFilter from './ConsultationFilter';
import SpecialtyFilter from './SpecialtyFilter';
import SortFilter from './SortFilter';

export default function FilterPanel({
  mode, onModeChange,
  specialties, selectedSpecs, onSpecsChange,
  sortBy, onSortChange
}) {
  return (
    <aside className="w-64 p-4 bg-white rounded shadow space-y-6">
      <ConsultationFilter
        mode={mode}
        onChange={onModeChange}
      />
      <SpecialtyFilter
        specialties={specialties}
        selected={selectedSpecs}
        onChange={onSpecsChange}
      />
      <SortFilter
        sortBy={sortBy}
        onChange={onSortChange}
      />
    </aside>
  );
}
