import React from 'react'

export default function DoctorCard({ doctor }) {
  return (
    <div
      data-testid="doctor-card"
      className="p-4 bg-white rounded shadow"
    >
      <h2
        data-testid="doctor-name"
        className="text-xl font-semibold"
      >
        {doctor.name}
      </h2>
      <p data-testid="doctor-specialty">
        {doctor.specialities.map(s => s.name).join(', ')}
      </p>
      <p data-testid="doctor-experience">{doctor.experience}</p>
      <p data-testid="doctor-fee">{doctor.fees}</p>
    </div>
  )
}
