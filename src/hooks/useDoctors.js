import { useState, useEffect } from 'react';

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .finally(() => setLoading(false));
  }, []);
  return { doctors, loading };
}
