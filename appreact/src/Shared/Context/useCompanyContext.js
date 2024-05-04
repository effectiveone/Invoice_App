import { createContext, useContext } from "react";
import { useCompany } from "../Hook/useCompany";

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const Company = useCompany();

  return (
    <CompanyContext.Provider value={Company}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
