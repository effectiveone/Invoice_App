import { createTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const useTheme = () => {
  const dispatch = useDispatch();
  const [selectedDesign, setSelectedDesign] = useState();
  const design = useSelector((state) => state?.settings.mySystemOfDesign);
  const selectedDesignName = useSelector(
    (state) => state?.settings.settings.designName
  );

  useEffect(() => {
    const selectedDesign = design.find((p) => p.name === selectedDesignName);

    setSelectedDesign(selectedDesign);
  }, [design, selectedDesignName, dispatch]);

  return createTheme({
    palette: {
      primary: {
        main: selectedDesign?.primaryColor || "#000",
      },
      secondary: {
        main: selectedDesign?.secondaryColor || "#0F0",
      },
      background: {
        default: selectedDesign?.backgroundColor || "#000",
      },
      text: {
        primary: selectedDesign?.textColor || "#FF0",
      },
    },
  });
};

export default useTheme;
