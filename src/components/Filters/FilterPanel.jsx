import React from "react";
import ConsultationFilter from "./ConsultationFilter";
import SpecialtyFilter from "./SpecialtyFilter";
import SortFilter from "./SortFilter";

export default function FilterPanel({
  mode,
  onModeChange,
  specialties,
  selectedSpecs,
  onSpecsChange,
  sortBy,
  onSortChange,
}) {
  return (
    <aside className="w-64 space-y-6 sticky top-4 self-start">
      <div
        className="bg-white p-4 rounded-xl shadow space-y-4
                   max-h-[40vh] overflow-y-auto scrollbar-hide"
      >
        <ConsultationFilter mode={mode} onChange={onModeChange} />
        <SortFilter sortBy={sortBy} onChange={onSortChange} />
      </div>
      <div
        className="bg-white p-4 rounded-xl shadow
                   max-h-[50vh] overflow-y-auto scrollbar-hide"
      >
        <SpecialtyFilter
          specialties={specialties}
          selected={selectedSpecs}
          onChange={onSpecsChange}
        />
      </div>
    </aside>
  );
}
