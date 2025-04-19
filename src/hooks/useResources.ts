// src/hooks/useResources.ts
import { useState } from 'react';
import { Resource, ResourceAdd, Resources } from '../types/resource';

interface UseResourcesReturn {
  resources: Resources;
  loading: boolean;
  error: Error | null;
  fetchResources: ({page, perPage}: {page?: number, perPage?: number}) => Promise<void>;
  createResource: (newResource: Omit<Resource, 'id'>) => Promise<void>;
  updateResource: (id: number, updatedFields: Partial<Resource>) => Promise<void>;
  deleteResource: (id: number) => Promise<void>;
}

const useResources = (): UseResourcesReturn => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [resources, setResources] = useState<Resources>({
    data: [],
  message: '',
    total: 0});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer la liste des citoyens
  const fetchResources = async ({page, perPage}: {page?: number, perPage?: number}) => {    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${page && perPage ? baseUrl + "/Ressource" + `?page=${page}&perPage=${perPage}` : baseUrl + "/Ressource"}`);      
      if (!res.ok) throw new Error(`Erreur lors du chargement : ${res.status}`);
      const data: Resources = await res.json();
      setResources(data);
    } catch (err: any) {      
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau citoyen
  const createResource = async (newResource: Omit<Resource, 'id'>) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/Ressource`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource)
      });
      if (!res.ok) throw new Error(`Erreur lors de la création : ${res.status}`);
      const createdResource: ResourceAdd = await res.json();
      setResources((prev) => ({data: [...prev.data, createdResource.data], message: createdResource.message, total: prev.total + 1}));
    } catch (err: any) {
      setError(err);
    }
  };

  // Mettre à jour un citoyen
  const updateResource = async (id: number, updatedFields: Partial<Resource>) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/Ressource/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (!res.ok) throw new Error(`Erreur lors de la mise à jour : ${res.status}`);
      const updatedResource: ResourceAdd = await res.json();
      setResources((prev) => ({data: prev.data.map((resource) => (resource.id === id ? updatedResource.data : resource)), message: updatedResource.message, total: prev.total}));
    } catch (err: any) {
      setError(err);
    }
  };

  // Supprimer un citoyen
  const deleteResource = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/Ressource/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error(`Erreur lors de la suppression : ${res.status}`);
      const messageDeletedResource : Omit<ResourceAdd, 'data'> = await res.json();
      setResources((prev) => ({data: prev.data.filter((resource) => resource.id !== id), message: messageDeletedResource.message, total: prev.total - 1}));
    } catch (err: any) {
      setError(err);
    }
  };

  return {
    resources,
    loading,
    error,
    fetchResources,
    createResource,
    updateResource,
    deleteResource
  };
};

export default useResources;
