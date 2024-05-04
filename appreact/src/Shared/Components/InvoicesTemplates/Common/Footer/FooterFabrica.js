import FooterTemplateENG from "./FooterTemplateENG";
import FooterTemplatePL from "./FooterTemplatePL";
import FooterTemplateFR from "./FooterTemplateFR";

import { useSelector } from "react-redux";

const FooterFactory = () => {
  const language = useSelector((state) => state?.settings.settings?.lang);

  switch (language) {
    case "en":
      return <FooterTemplateENG />;
    case "pl":
      return <FooterTemplatePL />;
    case "fr":
      return <FooterTemplateFR />;
    default:
      return <FooterTemplateENG />;
  }
};

export default FooterFactory;
