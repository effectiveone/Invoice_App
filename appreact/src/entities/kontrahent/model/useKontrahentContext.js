import { createContext, useContext } from "react";
import { useKontrahent } from "../../../shared/lib/useKontrahent";

const KontrahentContext = createContext();

export const useKontrahentContext = () => useContext(KontrahentContext);

export const KontrahentProvider = ({ children }) => {
  const kontrahent = useKontrahent();

  return (
    <KontrahentContext.Provider value={kontrahent}>
      {children}
    </KontrahentContext.Provider>
  );
};

export default KontrahentProvider;
