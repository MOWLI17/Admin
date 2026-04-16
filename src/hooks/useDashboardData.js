import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const cache = new Map();

/**
 * Custom hook to fetch and cache dashboard data.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {object} options - Options including forceRefresh and axios config.
 */
export const useDashboardData = (endpoint, options = {}) => {
  const [data, setData] = useState(cache.get(endpoint) || null);
  const [loading, setLoading] = useState(!cache.has(endpoint));
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // If we have cached data and aren't forcing a refresh, return early
    if (cache.has(endpoint) && !options.forceRefresh) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      // Abort any previous request for the same endpoint if it's still in-flight
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        // Note: For demonstration this is using a mock delay. 
        // In real use, swap the await new Promise with a real axios call.
        // const response = await axios.get(endpoint, { signal: abortControllerRef.current.signal });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResponse = { data: { status: 'success', lastUpdate: new Date().toISOString() } };
        
        cache.set(endpoint, mockResponse.data);
        setData(mockResponse.data);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message || 'Sync error with server');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [endpoint, options.forceRefresh]);

  return { data, loading, error };
};
