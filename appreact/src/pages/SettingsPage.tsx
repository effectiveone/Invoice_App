import React from 'react';
import Layout from '../shared/ui/Layout/layout';
import Settings from '../features/settings/ui/Settings/Settings';

const SettingsPage: React.FC = () => {
  return (
    <>
      <Settings />
    </>
  );
};

export default Layout(SettingsPage);
