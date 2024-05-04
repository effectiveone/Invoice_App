import FooterFactory from "./FooterFabrica";
import { useInvoiceContext } from "../../../../Context/useInvoiceContext";
import { t } from "i18next";
import { Grid } from "@material-ui/core";

const Footer = () => {
  const { totalGrossValue } = useInvoiceContext();
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>
              {t("totalPayment")}: {totalGrossValue}
            </div>
          </Grid>
          <Grid item xs={6}>
            <FooterFactory />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>{t("Issued by:")}</div>
            <div>
              {t("Signature of the person authorized to issue VAT invoice")}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>{t("Received by:")}</div>
            <div>
              {t("Signature of the person authorized to receive VAT invoice")}
            </div>
          </Grid>
        </Grid>
      </div>{" "}
    </>
  );
};

export default Footer;
