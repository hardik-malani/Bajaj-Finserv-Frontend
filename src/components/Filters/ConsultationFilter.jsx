import React from 'react';

export default function ConsultationFilter({ mode, onChange }) {
  return (
    <div>
      <h3 data-testid="filter-header-moc" className="font-semibold mb-2">
        Consultation Mode
      </h3>
      <label className="flex items-center space-x-2">
        <input
          data-testid="filter-video-consult"
          type="radio"
          name="mode"
          value="video"
          checked={mode === 'video'}
          onChange={e => onChange(e.target.value)}
        />
        <span>Video Consult</span>
      </label>
      <label className="flex items-center space-x-2 mt-1">
        <input
          data-testid="filter-in-clinic"
          type="radio"
          name="mode"
          value="clinic"
          checked={mode === 'clinic'}
          onChange={e => onChange(e.target.value)}
        />
        <span>In Clinic</span>
      </label>
    </div>
  );
}
