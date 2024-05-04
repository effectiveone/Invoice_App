import React from "react";
import { useSettings } from "../../Hook/useSettings";

const DesignSelect = () => {
  const { mySystemOfDesign, handleThemeChange, selectedDesign } = useSettings();
  return (
    <>
      <select value={selectedDesign} onChange={handleThemeChange}>
        {mySystemOfDesign?.map((design) => (
          <option key={design.name} value={design.name}>
            {design.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default DesignSelect;
