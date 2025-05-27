import React from "react";
import Layout from "../shared/ui/Layout/layout";
import { CompanyProvider } from "../entities/user/model/useCompanyContext";
import { CompanyContent } from "../features/company/ui/Company/CompanyContent";

const MyCompanyPage = () => {
  return (
    <CompanyProvider>
      <CompanyContent />
    </CompanyProvider>
  );
};

export default Layout(MyCompanyPage);
