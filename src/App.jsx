import { useDoctors } from './hooks/useDoctors';

export default function App() {
  const { doctors, loading } = useDoctors();

  if (loading) {
    return <p className="text-center mt-10">Loading doctors…</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {doctors.map(doc => (
        <div key={doc.id} data-testid="doctor-card" className="p-4 mb-4 bg-white rounded shadow">
          <h2 data-testid="doctor-name" className="text-xl font-semibold">{doc.name}</h2>
          <p data-testid="doctor-specialty">{doc.specialities.map(s => s.name).join(', ')}</p>
          <p data-testid="doctor-experience">{doc.experience}</p>
          <p data-testid="doctor-fee">{doc.fees}</p>
        </div>
      ))}
    </div>
  );
}
