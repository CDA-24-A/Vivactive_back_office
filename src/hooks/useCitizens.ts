// src/hooks/useCitizens.ts
import { useState } from 'react';
import { Citizen, CitizenAdd, Citizens } from '../types/citizen';

interface UseCitizensReturn {
  citizens: Citizens;
  loading: boolean;
  error: Error | null;
  fetchCitizens: ({page, perPage}: {page?: number, perPage?: number}) => Promise<void>;
  createCitizen: (newCitizen: Omit<Citizen, 'id'>) => Promise<void>;
  updateCitizen: (id: number, updatedFields: Partial<Citizen>) => Promise<void>;
  deleteCitizen: (id: number) => Promise<void>;
}

const useCitizens = (): UseCitizensReturn => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [citizens, setCitizens] = useState<Citizens>({
    data: [],
  message: '',
    total: 0});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer la liste des citoyens
  const fetchCitizens = async ({page, perPage}: {page?: number, perPage?: number}) => {    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${page && perPage ? baseUrl + "/citizen" + `?page=${page}&perPage=${perPage}` : baseUrl + "/citizen"}`);      
      if (!res.ok) throw new Error(`Erreur lors du chargement : ${res.status}`);
      const data: Citizens = await res.json();
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
      const res = await fetch(`${baseUrl}/citizen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCitizen)
      });
      if (!res.ok) throw new Error(`Erreur lors de la création : ${res.status}`);
      const createdCitizen: CitizenAdd = await res.json();
      setCitizens((prev) => ({data: [...prev.data, createdCitizen.data], message: createdCitizen.message, total: prev.total + 1}));
    } catch (err: any) {
      setError(err);
    }
  };

  // Mettre à jour un citoyen
  const updateCitizen = async (id: number, updatedFields: Partial<Citizen>) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/citizen/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (!res.ok) throw new Error(`Erreur lors de la mise à jour : ${res.status}`);
      const updatedCitizen: CitizenAdd = await res.json();
      setCitizens((prev) => ({data: prev.data.map((citizen) => (citizen.id === id ? updatedCitizen.data : citizen)), message: updatedCitizen.message, total: prev.total}));
    } catch (err: any) {
      setError(err);
    }
  };

  // Supprimer un citoyen
  const deleteCitizen = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/citizen/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`Erreur lors de la suppression : ${res.status}`);
      const messageDeletedCitizen : Omit<CitizenAdd, 'data'> = await res.json();
      setCitizens((prev) => ({data: prev.data.filter((citizen) => citizen.id !== id), message: messageDeletedCitizen.message, total: prev.total - 1}));
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
