import React from 'react';

export default function SpecialtyFilter({ specialties, selected, onChange }) {
  return (
    <div>
      <h3 data-testid="filter-header-speciality" className="font-semibold mb-2">
        Specialities
      </h3>
      {specialties.map(spec => (
        <label key={spec} className="flex items-center space-x-2 mb-1">
          <input
            data-testid={`filter-specialty-${spec.replace(/\s+/g, '-')}`}
            type="checkbox"
            value={spec}
            checked={selected.includes(spec)}
            onChange={e => {
              const v = e.target.value;
              if (selected.includes(v)) {
                onChange(selected.filter(s => s !== v));
              } else {
                onChange([...selected, v]);
              }
            }}
          />
          <span>{spec}</span>
        </label>
      ))}
    </div>
  );
}
