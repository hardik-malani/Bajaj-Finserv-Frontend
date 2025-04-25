import React from 'react';

export default function SortFilter({ sortBy, onChange }) {
  return (
    <div>
      <h3 data-testid="filter-header-sort" className="font-semibold mb-2">
        Sort
      </h3>
      <label className="flex items-center space-x-2">
        <input
          data-testid="sort-fees"
          type="radio"
          name="sort"
          value="fees"
          checked={sortBy === 'fees'}
          onChange={e => onChange(e.target.value)}
        />
        <span>Fees (asc)</span>
      </label>
      <label className="flex items-center space-x-2 mt-1">
        <input
          data-testid="sort-experience"
          type="radio"
          name="sort"
          value="experience"
          checked={sortBy === 'experience'}
          onChange={e => onChange(e.target.value)}
        />
        <span>Experience (desc)</span>
      </label>
    </div>
  );
}
