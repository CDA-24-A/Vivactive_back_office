// src/hooks/useCitizens.ts
import { useState } from 'react';

export interface Citizen {
  id: number;
  name: string;
  email: string;
}

interface UseCitizensReturn {
  citizens: Citizen[];
  loading: boolean;
  error: Error | null;
  fetchCitizens: () => Promise<void>;
  createCitizen: (newCitizen: Omit<Citizen, 'id'>) => Promise<void>;
  updateCitizen: (id: number, updatedFields: Partial<Citizen>) => Promise<void>;
  deleteCitizen: (id: number) => Promise<void>;
}

const useCitizens = (): UseCitizensReturn => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer la liste des citoyens
  const fetchCitizens = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/citizen');
      if (!res.ok) throw new Error(`Erreur lors du chargement : ${res.status}`);
      const data: Citizen[] = await res.json();
      setCitizens(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau citoyen
  const createCitizen = async (newCitizen: Omit<Citizen, 'id'>) => {
    setError(null);
    try {
      const res = await fetch('/api/citizen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCitizen)
      });
      if (!res.ok) throw new Error(`Erreur lors de la création : ${res.status}`);
      const createdCitizen: Citizen = await res.json();
      setCitizens((prev) => [...prev, createdCitizen]);
    } catch (err: any) {
      setError(err);
    }
  };

  // Mettre à jour un citoyen
  const updateCitizen = async (id: number, updatedFields: Partial<Citizen>) => {
    setError(null);
    try {
      const res = await fetch(`/api/citizen/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (!res.ok) throw new Error(`Erreur lors de la mise à jour : ${res.status}`);
      const updatedCitizen: Citizen = await res.json();
      setCitizens((prev) =>
        prev.map((citizen) => (citizen.id === id ? updatedCitizen : citizen))
      );
    } catch (err: any) {
      setError(err);
    }
  };

  // Supprimer un citoyen
  const deleteCitizen = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`/api/citizen/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`Erreur lors de la suppression : ${res.status}`);
      setCitizens((prev) => prev.filter((citizen) => citizen.id !== id));
    } catch (err: any) {
      setError(err);
    }
  };

  return {
    citizens,
    loading,
    error,
    fetchCitizens,
    createCitizen,
    updateCitizen,
    deleteCitizen
  };
};

export default useCitizens;
