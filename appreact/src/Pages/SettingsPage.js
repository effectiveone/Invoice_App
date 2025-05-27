import Layout from "../shared/ui/Layout/layout";
import React from "react";
import Settings from "../features/settings/ui/Settings/Settings";

const SettingsPage = () => {
  return (
    <>
      <Settings />
    </>
  );
};

export default Layout(SettingsPage);
