import React from 'react';
import Layout from '../Shared/Components/Layout/layout';
import { KontrahentProvider } from '../Shared/Context/useKontrahentContext';
import { EnhancedContrahentsTable } from '../Shared/Components/DataTable';
import { useKontrahentContext } from '../Shared/Context/useKontrahentContext';

// Component that uses the kontrahent context
const ContrahentsTableWithContext = () => {
  const { kontrahent } = useKontrahentContext();

  return <EnhancedContrahentsTable contrahents={kontrahent || []} />;
};

const EnhancedKontrahentPage = () => {
  return (
    <KontrahentProvider>
      <ContrahentsTableWithContext />
    </KontrahentProvider>
  );
};

export default Layout(EnhancedKontrahentPage);
