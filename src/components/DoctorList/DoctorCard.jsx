import React from 'react';

export default function DoctorCard({ doctor }) {
  return (
    <div
      data-testid="doctor-card"
      className="flex bg-white rounded-xl shadow-md overflow-hidden"
    >
      <img
        src={doctor.photo || '/default-avatar.png'}
        alt={doctor.name}
        className="w-24 h-24 object-cover rounded-full m-4 flex-shrink-0"
      />
      <div className="flex flex-col flex-1 py-4 pr-4">
        <div className="flex justify-between items-start">
          <h2 data-testid="doctor-name" className="text-lg font-semibold text-gray-900">
            {doctor.name}
          </h2>
          <div className="text-blue-600 font-medium">{doctor.fees}</div>
        </div>
        <p data-testid="doctor-specialty" className="text-sm text-gray-600">
          {doctor.specialities.map(s => s.name).join(', ')}
        </p>
        <p data-testid="doctor-experience" className="text-sm text-gray-600">
          {doctor.experience}
        </p>
        <div className="mt-auto flex justify-between items-center pt-4">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 text-sm">
            Book Appointment
          </button>
          <div className="text-xs text-gray-500">
            {doctor.video_consult && <span className="mr-2">🎥</span>}
            {doctor.in_clinic && <span>🏥</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
