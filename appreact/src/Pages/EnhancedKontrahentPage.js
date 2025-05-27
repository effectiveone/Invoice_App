import React, { useEffect } from 'react';
import Layout from '../shared/ui/Layout/layout';
import { EnhancedContrahentsTable } from '../shared/ui/DataTable';
import { useKontrahent } from '../shared/lib/useKontrahent';

const EnhancedKontrahentPage = () => {
  const { kontrahent, loadKontrahents } = useKontrahent();

  // Załadowanie danych kontrahentów przy pierwszym renderze
  useEffect(() => {
    loadKontrahents();
  }, []);

  return <EnhancedContrahentsTable contrahents={kontrahent || []} />;
};

export default Layout(EnhancedKontrahentPage);
