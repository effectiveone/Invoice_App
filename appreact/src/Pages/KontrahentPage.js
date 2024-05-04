import Layout from "../Shared/Components/Layout/layout";
import React from "react";
import { KontrahentProvider } from "../Shared/Context/useKontrahentContext";
import KontrahentContent from "../Shared/Components/Kontrahent/KontrahentContent";

const KontrahentPage = () => {
  return (
    <KontrahentProvider>
      <KontrahentContent />
    </KontrahentProvider>
  );
};

export default Layout(KontrahentPage);
