import React from 'react';
import { StoreProvider, RouterProvider, I18nProvider } from './providers';
import { AppRoutes } from './routing';
import { useUser } from '../shared/lib/useUser';
import AlertNotification from '../shared/ui/AlertNotification';
import type { User } from '../types/common';

interface UseUserReturn {
  currentUser: User | null;
}

const AppContent: React.FC = (): JSX.Element => {
  const { currentUser }: UseUserReturn = useUser();

  return (
    <>
      {/* @ts-ignore - AppRoutes nie zostało jeszcze zmigrowne */}
      <AppRoutes currentUser={currentUser} />
      {/* @ts-ignore - AlertNotification nie zostało jeszcze zmigrowne */}
      <AlertNotification />
    </>
  );
};

const App: React.FC = (): JSX.Element => {
  return (
    <StoreProvider>
      <I18nProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </I18nProvider>
    </StoreProvider>
  );
};

export default App;
