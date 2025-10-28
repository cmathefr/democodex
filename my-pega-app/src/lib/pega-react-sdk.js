import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const PegaContext = createContext(null);

export function PegaProvider({ config, children }) {
  const value = useMemo(() => ({ config }), [config]);
  return <PegaContext.Provider value={value}>{children}</PegaContext.Provider>;
}

function usePegaContext() {
  const context = useContext(PegaContext);
  if (!context) {
    throw new Error('usePegaContext doit être utilisé à l\'intérieur d\'un PegaProvider.');
  }
  return context;
}

export function usePegaData({ dataPage }) {
  const { config } = usePegaContext();
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let isMounted = true;
    setState({ data: null, loading: true, error: null });

    async function fetchData() {
      try {
        // Ici, on simule l'appel réseau. Remplacez par un appel réel vers Pega.
        await new Promise((resolve) => setTimeout(resolve, 300));
        const data = config.mocks?.[dataPage] ?? [];
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error });
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [config, dataPage]);

  return state;
}

export function usePegaConfig() {
  const { config } = usePegaContext();
  return config;
}
