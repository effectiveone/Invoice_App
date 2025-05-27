import React from 'react';
import { StoreProvider, RouterProvider, I18nProvider } from './providers';
import { AppRoutes } from './routing';
import { useUser } from '../shared/lib/useUser';
import AlertNotification from '../shared/ui/AlertNotification';

function AppContent() {
  const { currentUser } = useUser();

  return (
    <>
      <AppRoutes currentUser={currentUser} />
      <AlertNotification />
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <I18nProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </I18nProvider>
    </StoreProvider>
  );
}

export default App;
