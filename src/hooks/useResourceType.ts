// src/hooks/useResource.ts
import { useState } from 'react';
import { ResourceTypeType, ResourceAddType, ResourcesType } from '../types/resourceTypeType';

interface UseResourcesReturn {
  resources: ResourcesType;
  loading: boolean;
  error: Error | null;
  fetchResources: ({ page, perPage }: { page?: number; perPage?: number }) => Promise<void>;
  createResource: (newResource: Omit<ResourceTypeType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateResource: (id: number, updatedFields: Partial<ResourceTypeType>) => Promise<void>;
  deleteResource: (id: number) => Promise<void>;
}

const useResources = (): UseResourcesReturn => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [resources, setResources] = useState<ResourcesType>({
    data: [],
    message: '',
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Récupérer les ressources
  const fetchResources = async ({ page, perPage }: { page?: number; perPage?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${page && perPage ? `${baseUrl}/resource?page=${page}&perPage=${perPage}` : `${baseUrl}/resource`}`
      );
      if (!res.ok) throw new Error(`Erreur lors du chargement : ${res.status}`);
      const data: ResourcesType = await res.json();
      setResources(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Créer une ressource
  const createResource = async (newResource: Omit<ResourceTypeType, 'id' | 'createdAt' | 'updatedAt'>) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/resource`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      });
      if (!res.ok) throw new Error(`Erreur lors de la création : ${res.status}`);
      const createdResource: ResourceAddType = await res.json();
      setResources((prev) => ({
        data: [...prev.data, createdResource.data],
        message: createdResource.message,
        total: prev.total + 1,
      }));
    } catch (err: any) {
      setError(err);
    }
  };

  // Mettre à jour une ressource
  const updateResource = async (id: number, updatedFields: Partial<ResourceTypeType>) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/resource/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error(`Erreur lors de la mise à jour : ${res.status}`);
      const updatedResource: ResourceAddType = await res.json();
      setResources((prev) => ({
        data: prev.data.map((r) => (r.id === id ? updatedResource.data : r)),
        message: updatedResource.message,
        total: prev.total,
      }));
    } catch (err: any) {
      setError(err);
    }
  };

  // Supprimer une ressource
  const deleteResource = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/resource/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Erreur lors de la suppression : ${res.status}`);
      const messageDeletedResource: Omit<ResourceAddType, 'data'> = await res.json();
      setResources((prev) => ({
        data: prev.data.filter((r) => r.id !== id),
        message: messageDeletedResource.message,
        total: prev.total - 1,
      }));
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
    deleteResource,
  };
};

export default useResources;
