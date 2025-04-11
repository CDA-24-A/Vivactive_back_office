// src/hooks/useFetch.js
import { useState, useEffect } from 'react';


interface UseFetchReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }

function useFetch<T> (url: string) : UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Démarrage du chargement dès le montage
    setLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
